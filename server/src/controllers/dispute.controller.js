import debug from 'debug';
import {
  createDispute,
  getDisputeByRequestId,
  updateDisputeStatus,
} from '../services/dispute.service.js';

const dbgr = debug('dev:controller:dispute');

export const createDisputeController = async (req, res, next) => {
  try {
    const { requestId, reason, message } = req.body;

    if (!requestId || !reason || !message) {
      return res.status(400).json({ message: "requestId, reason and message are required" });
    }

    if (req.files && req.files.length > 4) {
      return res.status(400).json({ message: "You can upload up to 4 images only" });
    }

    const dispute = await createDispute({
      requestId,
      userId: req.user.id,
      reason,
      message,
      files: req.files || []
    });

    res.status(201).json({
      message: 'Dispute raised successfully',
      dispute,
    });
  } catch (err) {
    dbgr('Error in createDisputeController');
    next(err);
  }
};

export const getDisputeByRequestController = async (req, res, next) => {
  try {
    const dispute = await getDisputeByRequestId(
      req.params.requestId,
      req.user.id
    );

    res.json({ dispute });
  } catch (err) {
    next(err);
  }
};

export const updateDisputeStatusController = async (req, res, next) => {
  try {
    const { status, adminNote } = req.body;

    const dispute = await updateDisputeStatus(
      req.params.id,
      status,
      adminNote
    );

    res.json({
      message: 'Dispute status updated',
      dispute,
    });
  } catch (err) {
    next(err);
  }
};
