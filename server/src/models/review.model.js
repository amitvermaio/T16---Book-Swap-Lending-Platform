import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 300,
  },
}, { timestamps: true });

reviewSchema.index({ user: 1, book: 1 }, { unique: true });
reviewSchema.index({ book: 1 });
reviewSchema.index({ user: 1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
