const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    userAgent: { type: String },
    path: { type: String, default: "/" },
    country: { type: String },
  },
  { timestamps: true }
);

visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ ip: 1, createdAt: -1 });

module.exports = mongoose.model("Visitor", visitorSchema);
