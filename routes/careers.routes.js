const express = require("express");
const multer = require('multer');
const { transporter } = require("../config/mail.config");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit 
});

router.post(
  "/apply",
  upload.single("resume"),
  async (req, res) => {
    try {
      const { full_name, email, phone, message } = req.body;
      const resumeFile = req.file;
      const { job_slug } = req.body;

      if (!resumeFile) {
        return res.status(400).json({
          success: false,
          message: "Resume file is required",
        })
      }

      await transporter.sendMail({
        from: `"FA Company Careers" <${process.env.EMAIL_USER}>`,
        to: process.env.HR_EMAIL,
        subject: `New Job Application for ${job_slug}`,
        html: `
          <h3>New Job Application</h3>
          <p><strong>Name:</strong> ${full_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        attachments: [
          {
            filename: resumeFile.originalname,
            content: resumeFile.buffer,
          },
        ],
      });

      return res.status(200).json({
        success: true,
        message: "Application received successfully",
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to submit application",
      });
    }
  }
);
module.exports = router;
