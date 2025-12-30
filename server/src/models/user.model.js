import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },

  avatar: { type: String },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: Number },

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

  emailVerified: {
    type: Boolean,
    default: false,
  },

  emailVerificationOTP: String,
  emailVerificationOTPExpiry: Date,

  resetPasswordOTP: String,
  resetPasswordOTPExpiry: Date,
}, { timestamps: true });

userSchema.index({ city: 1 });

const User = mongoose.model('User', userSchema);
export default User;