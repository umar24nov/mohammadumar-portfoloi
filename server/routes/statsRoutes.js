const express = require("express");
const router = express.Router();
const { trackVisitor, getStats, getRecentActivity } = require("../controllers/statsController");

router.post("/visitor", trackVisitor);
router.get("/stats", getStats);
router.get("/activity", getRecentActivity);

module.exports = router;
