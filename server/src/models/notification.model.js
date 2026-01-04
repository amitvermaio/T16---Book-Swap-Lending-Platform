import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: [
        'REQUEST_CREATED',
        'REQUEST_APPROVED',
        'REQUEST_REJECTED',
        'REQUEST_CANCELLED',
        'BOOK_RETURNED',
        'BOOK_AVAILABLE',
        'RATING_RECEIVED'
      ],
      required: true,
    },
    title: String,
    message: String,
    data: mongoose.Schema.Types.Mixed, // e.g. { requestId, bookId }
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
