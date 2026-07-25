const express = require("express");
const router = express.Router();
const { submitFeedback, getFeedback, updateFeedbackStatus } = require("../controllers/feedbackController");
const { validateFeedback, handleValidation } = require("../middleware/validation");
const { strictLimiter } = require("../middleware/rateLimiter");

router.post("/", strictLimiter, validateFeedback, handleValidation, submitFeedback);
router.get("/", getFeedback);
router.patch("/:id/status", updateFeedbackStatus);

module.exports = router;
