import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    type: { type: String, enum: ['borrow', 'swap', 'donate'], required: true },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled', 'completed'],
      default: 'pending',
    },
    exchangeCode: { type: String }, 
    rejectionReason: { type: String }, 
    dueDate: Date,
    returnedAt: Date,
    offeredBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, 
    notes: String,
    pickupInfo: {
      location: String,
      datetime: Date,
      note: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Request', requestSchema);