const express = require("express");
const router = express.Router();
const { submitContact, getContacts, updateContactStatus } = require("../controllers/contactController");
const { validateContact, handleValidation } = require("../middleware/validation");
const { strictLimiter } = require("../middleware/rateLimiter");

router.post("/", strictLimiter, validateContact, handleValidation, submitContact);
router.get("/", getContacts);
router.patch("/:id/status", updateContactStatus);

module.exports = router;
