const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { type, name, email, message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const feedback = await Feedback.create({
      type: type || "Bug Report",
      name: name || "Anonymous",
      email: email || "",
      message: message.trim(),
    });

    res.status(201).json({ success: true, id: feedback._id });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Feedback.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Feedback.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const item = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) return res.status(404).json({ error: "Feedback not found" });

    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ error: "Failed to update feedback" });
  }
};
