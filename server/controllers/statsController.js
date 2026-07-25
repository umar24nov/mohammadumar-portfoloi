const Visitor = require("../models/Visitor");
const Feedback = require("../models/Feedback");
const Contact = require("../models/Contact");

exports.trackVisitor = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"] || "";
    const path = req.body.path || "/";

    await Visitor.create({ ip, userAgent, path });

    res.json({ success: true });
  } catch (err) {
    console.error("Visitor tracking error:", err);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalVisitors,
      todayVisitors,
      weekVisitors,
      monthVisitors,
      totalFeedback,
      newFeedback,
      totalContacts,
      newContacts,
    ] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ createdAt: { $gte: today } }),
      Visitor.countDocuments({ createdAt: { $gte: thisWeek } }),
      Visitor.countDocuments({ createdAt: { $gte: thisMonth } }),
      Feedback.countDocuments(),
      Feedback.countDocuments({ status: "new" }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
    ]);

    res.json({
      visitors: { total: totalVisitors, today: todayVisitors, week: weekVisitors, month: monthVisitors },
      feedback: { total: totalFeedback, new: newFeedback },
      contacts: { total: totalContacts, new: newContacts },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const [recentFeedback, recentContacts, recentVisitors] = await Promise.all([
      Feedback.find().sort({ createdAt: -1 }).limit(5).select("type name message status createdAt"),
      Contact.find().sort({ createdAt: -1 }).limit(5).select("name email subject status createdAt"),
      Visitor.find().sort({ createdAt: -1 }).limit(10).select("path createdAt"),
    ]);

    res.json({ recentFeedback, recentContacts, recentVisitors });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};
