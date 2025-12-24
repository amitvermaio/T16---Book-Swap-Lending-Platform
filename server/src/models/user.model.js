import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    location: {
      city: String,
      state: String,
      country: String,

      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    lendingPreferences: {
      visibility: {
        type: String,
        enum: ['all', 'friends', 'verified'],
        default: 'all',
      },
      onlyLocal: { type: Boolean, default: true },
    },

    ratingStats: {
      avgRating: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
  },{ timestamps: true });

userSchema.index({ location: '2dsphere' });

export default mongoose.model('User', userSchema);
