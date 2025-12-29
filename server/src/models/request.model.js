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

    // A secret code generated when Approved. Requester gives this to Owner upon receipt.
    exchangeCode: { type: String }, 

    rejectionReason: { type: String }, 

    dueDate: Date,
    returnedAt: Date,
    offeredBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, // Used when swap request
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Request', requestSchema);