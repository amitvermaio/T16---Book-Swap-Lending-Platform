import Dispute from '../models/dispute.model.js';
import Request from '../models/request.model.js';
import AppError from '../utils/AppError.js';

import { uploadToImageKit } from './storage.service.js';

const COMPLETED_DISPUTE_WINDOW_HOURS = 48;

export const createDispute = async ({
  requestId,
  userId,
  reason,
  message,
  files,
}) => {
  const request = await Request.findById(requestId);
  if (!request) {
    throw new AppError('Request not found', 404);
  }

  if (request.status === 'completed') {
    const diff = Date.now() - new Date(request.updatedAt).getTime();

    const windowMs =
      COMPLETED_DISPUTE_WINDOW_HOURS * 60 * 60 * 1000;

    if (diff > windowMs) {
      throw new AppError(
        'Dispute window expired for this request',
        400
      );
    }
  }
  // } else if (request.status !== 'collected') {
  //   throw new AppError(
  //     'Dispute can only be raised after book collection',
  //     400
  //   );
  // }

  const existingDispute = await Dispute.findOne({ requestId });
  if (existingDispute) {
    throw new AppError(
      'Dispute already exists for this request',
      400
    );
  }

  let imagesUrls = [];
  if (files.length > 0) {
    const uploadPromises = files.map((file) => {
      return uploadToImageKit(file, "/bookswap_disputes");
    });

    imagesUrls = await Promise.all(uploadPromises);
  }

  const dispute = await Dispute.create({
    requestId,
    raisedBy: userId,
    reason,
    message,
    images: imagesUrls,
  });

  return dispute;
};

export const getDisputeByRequestId = async (requestId, userId) => {
  const dispute = await Dispute.findOne({ requestId })
    .populate('raisedBy', 'name email')
    .populate('requestId');

  if (!dispute) {
    throw new AppError('Dispute not found', 404);
  }

  if (dispute.raisedBy._id.toString() !== userId.toString()) {
    throw new AppError('Unauthorized access', 403);
  }

  return dispute;
};

export const updateDisputeStatus = async (
  disputeId,
  status,
  adminNote
) => {
  const dispute = await Dispute.findById(disputeId);
  if (!dispute) {
    throw new AppError('Dispute not found', 404);
  }

  if (!['RESOLVED', 'REJECTED'].includes(status)) {
    throw new AppError('Invalid dispute status', 400);
  }

  dispute.status = status;
  if (adminNote) dispute.adminNote = adminNote;

  await dispute.save();
  return dispute;
};
