import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: String,
  genre: [String],
  description: String,
  coverImageUrl: String,

  availabilityType: {
    type: String,
    enum: ['lend', 'swap', 'donate'],
    required: true,
  },

  status: {
    type: String,
    enum: ['available', 'requested', 'lent', 'swapped', 'unavailable'],
    default: 'available',
  },

  location: {
    city: String,
    state: String,
    country: String,
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number],
    },
  },

  tags: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text' });
bookSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.model('Book', bookSchema);
