const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Bug Report", "Suggestion", "Compliment", "Collaborate"],
      required: true,
    },
    name: { type: String, trim: true, maxlength: 100 },
    email: { type: String, trim: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

feedbackSchema.index({ createdAt: -1 });
feedbackSchema.index({ status: 1 });

module.exports = mongoose.model("Feedback", feedbackSchema);
