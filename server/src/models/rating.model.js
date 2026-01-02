import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
    score: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxLength: 500 }, // Added max length for safety
  },
  { timestamps: true }
);

// Ensures 'fromUser' can only create ONE rating for a specific 'request'.
ratingSchema.index({ fromUser: 1, request: 1 }, { unique: true });

export default mongoose.model('Rating', ratingSchema);