import Request from '../models/request.model.js';
import Book from '../models/book.model.js';
import Notification from '../models/notification.model.js';
import AppError from '../utils/AppError.js';
import { getIO } from '../sockets/socket.js';

export const createRequest = async ({
  requesterId,
  bookId,
  type,
  offeredBookId,
  dueDate,
  notes,
}) => {
  const book = await Book.findById(bookId).populate('owner');
  if (!book) throw new AppError('Book not found', 404);
  if (book.status !== 'available') {
    throw new AppError('Book not available', 400);
  }

  if (type === 'swap' && !offeredBookId) {
    throw new AppError('offeredBookId is required for swap', 400);
  }

  if (book.owner._id.toString() === requesterId) {
    throw new AppError('Cannot request your own book', 400);
  }

  const request = await Request.create({
    book: book._id,
    owner: book.owner._id,
    requester: requesterId,
    type,
    offeredBook: offeredBookId || null,
    dueDate: dueDate || null,
    notes,
  });

  book.status = 'requested';
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
    .populate('owner', 'name avatar')
    .sort({ createdAt: -1 });
};

export const getRequestById = async (id, userId) => {
  const reqDoc = await Request.findById(id)
    .populate('book')
    .populate('requester', 'name')
    .populate('owner', 'name');

  if (!reqDoc) throw new AppError('Request not found', 404);
  if (
    reqDoc.owner._id.toString() !== userId &&
    reqDoc.requester._id.toString() !== userId
  ) {
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
  const reqDoc = await Request.findById(requestId).populate('book');
  if (!reqDoc) throw new AppError('Request not found', 404);

  const isOwner = reqDoc.owner.toString() === userId;
  const isRequester = reqDoc.requester.toString() === userId;
  // 'pending', 'approved', 'rejected', 'cancelled', 'completed'
  if (action === 'approved' || action === 'rejected') {
    if (!isOwner) throw new AppError('Only owner can approve/reject', 403);
  }

  if (action === 'cancelled') {
    if (!isRequester) throw new AppError('Only requester can cancel', 403);
  }

  const io = getIO();

  if (action === 'approved') {
    reqDoc.status = 'approved';
    reqDoc.pickupInfo = pickupInfo;
    reqDoc.book.status = 'lent';
    await reqDoc.book.save();
  } else if (action === 'rejected') {
    reqDoc.status = 'rejected';
    reqDoc.book.status = 'available';
    await reqDoc.book.save();
  } else if (action === 'cancelled') {
    reqDoc.status = 'cancelled';
    reqDoc.book.status = 'available';
    await reqDoc.book.save();
  }

  await reqDoc.save();

  const targetUserId = isOwner ? reqDoc.requester : reqDoc.owner;

  const data = { requestId: reqDoc._id, status: reqDoc.status };
  if (action === 'approved' && pickupInfo) {
    data.pickupInfo = pickupInfo;
  }

  const notif = await Notification.create({
    user: targetUserId,
    type: action === 'approved' ? 'REQUEST_APPROVED' :
      action === 'rejected' ? 'REQUEST_REJECTED' :
        'REQUEST_CANCELLED',
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

export const markReturned = async ({ requestId, ownerId }) => {
  const reqDoc = await Request.findById(requestId).populate('book');
  if (!reqDoc) throw new AppError('Request not found', 404);

  if (reqDoc.owner.toString() !== ownerId) {
    throw new AppError('Only owner can mark returned', 403);
  }

  reqDoc.status = 'completed';
  reqDoc.returnedAt = new Date();
  reqDoc.book.status = 'available';

  await reqDoc.book.save();
  await reqDoc.save();

  const io = getIO();

  const notif = await Notification.create({
    user: reqDoc.requester,
    type: 'BOOK_RETURNED',
    title: 'Book returned',
    message: `Book "${reqDoc.book.title}" marked as returned`,
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
    status: 'approved'
  })
    .populate('book')
    .populate('requester', 'name avatar city state')
    .populate('owner', 'name avatar city state')
    .sort({ updatedAt: -1 });

  return requests;
};
