const express = require("express");
const router = express.Router();

const { sendContactEmails } = require("../services/mail.service");

router.post("/", async (req, res) => {
  try {
    await sendContactEmails(req.body);

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Contact route error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

module.exports = router;
