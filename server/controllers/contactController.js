const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject || "",
      message: message.trim(),
    });

    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Contact.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const item = await Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) return res.status(404).json({ error: "Contact not found" });

    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};
