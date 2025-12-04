// src/models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    type: {
      type: String,
      enum: ['borrow', 'swap', 'donate'],
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled', 'ongoing', 'completed'],
      default: 'pending',
    },

    dueDate: Date,
    returnedAt: Date,

    // for swap
    offeredBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },

    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
