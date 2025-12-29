import {
  createRequest,
  listRequests,
  getRequestById,
  updateRequestStatus,
  markReturned,
} from '../services/request.service.js';

export const createRequestController = async (req, res, next) => {
  try {
    const { bookId, type, offeredBookId, dueDate, notes } = req.body;
    const payload = { requesterId: req.user.id, bookId, type, offeredBookId, dueDate, notes };

    const request = await createRequest(payload);
    res.status(201).json({ success: true, request });
  } catch (err) {
    next(err);
  }
};

export const listRequestsController = async (req, res, next) => {
  try {
    const as = req.query.as || 'requester';
    const requests = await listRequests(req.user.id, as);
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};

export const getRequestController = async (req, res, next) => {
  try {
    const request = await getRequestById(req.params.id, req.user.id);
    res.json({ request });
  } catch (err) {
    next(err);
  }
};

export const updateRequestStatusController = async (req, res, next) => {
  try {
    const { action } = req.body;
    const request = await updateRequestStatus({
      requestId: req.params.id,
      userId: req.user.id,
      action,
    });

    res.json({ success: true, request });
  } catch (err) {
    next(err);
  }
};

export const markReturnedController = async (req, res, next) => {
  try {
    const request = await markReturned({
      requestId: req.params.id,
      ownerId: req.user.id,
    });
    res.json({ request });
  } catch (err) {
    next(err);
  }
};
