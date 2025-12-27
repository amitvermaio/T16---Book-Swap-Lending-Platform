import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  genre: [String],
  description: String,
  coverImageUrl: { type: String, required: true },

  availabilityType: { type: [String], enum: ['lend', 'swap', 'donate'], required: true },

  genre: { type: [String], default: [] },

  additionalImages: { type: [String] },
  
  status: {
    type: String,
    enum: ['available', 'requested', 'lent', 'swapped', 'unavailable'],
    default: 'available',
  },

  location: {
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
  },
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text' });

export default mongoose.model('Book', bookSchema);