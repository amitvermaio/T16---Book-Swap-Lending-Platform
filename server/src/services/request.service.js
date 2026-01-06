import Request from '../models/request.model.js';
import Book from '../models/book.model.js';
import Notification from '../models/notification.model.js';
import AppError from '../utils/AppError.js';
import { generateOTP } from '../utils/generateOtp.js';
import { getIO } from '../sockets/socket.js';
import debug from 'debug';

const dbgr = debug('app:request-service');

export const createRequest = async ({
  requesterId,
  bookId,
  type, // swap, borrow, donate
  offeredBookId,
  dueDate,
  notes,
}) => {
  const book = await Book.findById(bookId).populate('owner');
  if (!book) throw new AppError('Book not found', 404);

  if (book.status !== 'available') {
    throw new AppError('Book not available', 400);
  }
  if (book.owner._id.toString() === requesterId) {
    throw new AppError('Cannot request your own book', 400);
  }

  if (type === 'swap') {
    if (!offeredBookId) {
      throw new AppError('offeredBookId is required for swap', 400);
    }
    const exchange = await Book.findById(offeredBookId).populate('owner');
    if (!exchange) throw new AppError('Offered book not found', 404);

    if (exchange.owner._id.toString() !== requesterId) {
      throw new AppError('You can only swap your own books', 403);
    }

    exchange.status = 'swapped';
    await exchange.save();
  }

  if (type === 'borrow' && !dueDate) {
    throw new AppError('Due date is required for borrowing', 400);
  }


  const request = await Request.create({
    book: book._id,
    owner: book.owner._id,
    requester: requesterId,
    type,
    offeredBook: (type === 'swap') ? offeredBookId : null, // Donate/Borrow me null
    dueDate: (type === 'borrow' || type === 'swap') ? dueDate : null,         // Donate me null
    notes,
  });

  book.status = type === 'swap' ? 'swapped' : 'requested';
  await book.save();

  const notif = await Notification.create({
    user: book.owner._id,
    type: 'REQUEST_CREATED',
    title: 'New book request',
    message: `New ${type} request for "${book.title}"`,
    data: { requestId: request._id, bookId: book._id },
  });

  const io = getIO();
  io.to(`user:${book.owner._id.toString()}`).emit('notification:new', notif);

  return request;
};

export const listRequests = async (userId, as) => {
  const filter = {
    ...(as === 'owner' ? { owner: userId } : { requester: userId }),
    status: { $in: ['pending', 'rejected', 'cancelled'] }
  };

  return Request.find(filter)
    .populate('book')
    .populate('requester', 'name avatar address city state pincode')
    .populate('owner', 'name avatar city state')
    .populate('offeredBook', '_id title author coverImageUrl')
    .sort({ createdAt: -1 });
};

export const getRequestById = async (id, userId) => {
  const reqDoc = await Request.findById(id)
    .populate('book')
    .populate('requester', 'name avatar city state email')
    .populate('owner', 'name avatar city state email');

  if (!reqDoc) throw new AppError('Request not found', 404);

  if (reqDoc.owner._id.toString() !== userId && reqDoc.requester._id.toString() !== userId) {
    throw new AppError('Forbidden', 403);
  }

  return reqDoc;
};

export const updateRequestStatus = async ({
  requestId,
  userId,
  action,
  pickupInfo,
}) => {
  const reqDoc = await Request.findById(requestId)
    .populate('book')
    .populate('offeredBook');

  if (!reqDoc) throw new AppError('Request not found', 404);

  const isOwner = reqDoc.owner.toString() === userId;
  const isRequester = reqDoc.requester.toString() === userId;

  if (action === 'approved' || action === 'rejected') {
    if (!isOwner) throw new AppError('Only owner can approve/reject', 403);
  }

  if (action === 'cancelled') {
    if (!isRequester) throw new AppError('Only requester can cancel', 403);
    if (reqDoc.status === 'collected') {
      throw new AppError('Cannot cancel request that is collected', 400);
    }
  }

  const io = getIO();

  if (action === 'approved') {
    reqDoc.status = 'approved';
    reqDoc.pickupInfo = pickupInfo;
    reqDoc.exchangeCode = generateOTP();

    if (reqDoc.type === 'borrow') {
      reqDoc.book.status = 'lent'; 
      await reqDoc.book.save();
    }
    else if (reqDoc.type === 'donate') {
      reqDoc.book.status = 'unavailable';
      await reqDoc.book.save();
    }
    else if (reqDoc.type === 'swap') {
      reqDoc.book.status = 'swapped';
      await reqDoc.book.save();

      if (reqDoc.offeredBook) {
        reqDoc.offeredBook.status = 'swapped';
        await reqDoc.offeredBook.save();
      }
    }

    //  Reject all other pending requests for this book 
    // Kyunki book ab kisi ek ko promise ho gayi hai
    await Request.updateMany(
      {
        book: reqDoc.book._id,
        _id: { $ne: reqDoc._id }, // current request ko chhodkar
        status: 'pending',
      },
      { status: 'rejected' }
    );
  } 
  else if (action === 'rejected' || action === 'cancelled') {
    reqDoc.status = action;
    reqDoc.book.status = 'available';
    await reqDoc.book.save();

    if (reqDoc.type === 'swap' && reqDoc.offeredBook) {
      reqDoc.offeredBook.status = 'available';
      await reqDoc.offeredBook.save();
    }
  }

  await reqDoc.save();
  
  const targetUserId = isOwner ? reqDoc.requester : reqDoc.owner;

  const data = { requestId: reqDoc._id, status: reqDoc.status };
  if (action === 'approved' && pickupInfo) {
    data.pickupInfo = pickupInfo;
  }

  const notif = await Notification.create({
    user: targetUserId,
    type:
      action === 'approved'
        ? 'REQUEST_APPROVED'
        : action === 'rejected'
        ? 'REQUEST_REJECTED'
        : 'REQUEST_CANCELLED',
    title: `Request ${action}`,
    message: `Your request for "${reqDoc.book.title}" is ${reqDoc.status}`,
    data: data,
  });

  io.to(`user:${targetUserId.toString()}`).emit('request:updated', {
    requestId: reqDoc._id,
    status: reqDoc.status,
  });

  io.to(`user:${targetUserId.toString()}`).emit('notification:new', notif);

  return reqDoc;
};

export const verifyExchangeCode = async ({ requestId, ownerId, code }) => {
  const reqDoc = await Request.findById(requestId).populate('book');

  if (!reqDoc) throw new AppError('Request not found', 404);
  if (reqDoc.owner.toString() !== ownerId) throw new AppError('Unauthorized', 403);

  if (reqDoc.exchangeCode !== code) {
    throw new AppError('Invalid Exchange Code', 400);
  }

  reqDoc.status = 'collected';
  await reqDoc.save();

  const io = getIO();
  io.to(`user:${reqDoc.requester.toString()}`).emit('request:updated', {
    requestId: reqDoc._id,
    status: 'collected',
  });

  return reqDoc;
};

export const markReturned = async ({ requestId, ownerId }) => {
  const reqDoc = await Request.findById(requestId)
    .populate('book')
    .populate('offeredBook');

  dbgr("reqDoc", reqDoc);
  if (!reqDoc) throw new AppError('Request not found', 404);

  if (reqDoc.owner.toString() !== ownerId) {
    throw new AppError('Only owner can mark returned', 403);
  }

  reqDoc.status = 'completed';
  reqDoc.returnedAt = new Date();

  if (reqDoc.book) {
    reqDoc.book.status = 'available';
    await reqDoc.book.save();
  }

  if (reqDoc.type === 'swap' && reqDoc.offeredBook) {
    reqDoc.offeredBook.status = 'available';
    await reqDoc.offeredBook.save();
  }

  await reqDoc.save();

  const io = getIO();

  const notif = await Notification.create({
    user: reqDoc.requester,
    type: 'BOOK_RETURNED',
    title: 'Book returned',
    message: reqDoc.type === 'swap'
      ? `Swap completed! Both "${reqDoc.book.title}" and "${reqDoc.offeredBook?.title}" are marked returned.`
      : `Book "${reqDoc.book.title}" marked as returned`,
    data: { requestId: reqDoc._id, bookId: reqDoc.book._id },
  });

  io.to(`user:${reqDoc.requester.toString()}`).emit('request:updated', {
    requestId: reqDoc._id,
    status: reqDoc.status,
  });
  io.to(`user:${reqDoc.requester.toString()}`).emit('notification:new', notif);

  return reqDoc;
};

export const getActiveTrackings = async (userId) => {
  const requests = await Request.find({
    $or: [{ owner: userId }, { requester: userId }],
    status: { $in: ['approved', 'collected'] }
  })
    .populate('book')
    .populate('requester', 'name avatar city state')
    .populate('owner', 'name avatar city state')
    .populate('offeredBook', '_id title author coverImageUrl')
    .sort({ updatedAt: -1 });

  const sanitizedRequests = requests.map(req => {
    const reqObj = req.toObject();
    if (reqObj.owner._id.toString() === userId.toString()) {
      delete reqObj.exchangeCode; // Owner shouldn't see the exchangeCode in API response
    }
    return reqObj;
  });

  return sanitizedRequests;
};

export const getHistory = async (userId) => {
  const requests = await Request.find({
    $or: [{ owner: userId }, { requester: userId }],
    status: { $in: ['completed', 'rejected', 'cancelled'] }
  })
    .populate('book')
    .populate('requester', 'name avatar city state')
    .populate('owner', 'name avatar city state')
    .populate('offeredBook', '_id title author coverImageUrl')
    .limit(10)
    .sort({ updatedAt: -1 })
    .select('-exchangeCode')

  return requests;
};