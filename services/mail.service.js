const { transporter } = require("../config/mail.config");

const sendContactEmails = async (data) => {
  const { name, email, subject, message } = data;

  // 1️⃣ Email to Admin
  await transporter.sendMail({
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
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
}

module.exports = { sendContactEmails };
