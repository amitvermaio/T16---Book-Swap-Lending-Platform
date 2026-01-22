import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
    unique: true 
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reason: {
    type: String,
    enum: ["DAMAGED_BOOK", "WRONG_BOOK", "NOT_DELIVERED", "FAKE_CONDITION", "OTHER"],
    required: true
  },
  message: String,
  images: [String],
  adminNote: String, 
  status: {
    type: String,
    enum: ["OPEN", "UNDER_REVIEW", "RESOLVED", "REJECTED"],
    default: "OPEN"
  }
}, { timestamps: true });

const Dispute = mongoose.model("Dispute", disputeSchema);
export default Dispute;