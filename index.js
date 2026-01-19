require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer")

const app = express();
const PORT = 5000;

app.use(cors());

// Middleware
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running");
})

// POST
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    // 1️⃣ Email to Admin
    await transporter.sendMail({
      from: `"Wesite Contact <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      html: `
        <h3>New Contact Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 2️⃣ Confirmation Email to User
    await transporter.sendMail({
      from: `"FA Company" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your enquiry",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting us.</p>
        <p>We have received your message and will get back to you shortly.</p>
        <br />
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br />
        <p>Regards,<br/>FA Company Team</p>
      `,
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    
    res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
