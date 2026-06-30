const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, product) {

  const html = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial;background:#f5f5f5;padding:30px;">

    <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:30px;">

      <h1 style="color:#2563EB;">🚀 TrackKart</h1>

      <h2>Hello ${product.userName},</h2>

      <p>Your tracked product has reached your target price.</p>

      ${
        product.image
          ? `<img src="${product.image}" style="width:220px;border-radius:10px;">`
          : ""
      }

      <h3>${product.title}</h3>

      <p><strong>Current Price:</strong> ₹${Number(
        product.currentPrice
      ).toLocaleString("en-IN")}</p>

      <p><strong>Target Price:</strong> ₹${Number(
        product.targetPrice
      ).toLocaleString("en-IN")}</p>

      <a
        href="${product.url}"
        style="
          display:inline-block;
          margin-top:20px;
          padding:12px 24px;
          background:#2563EB;
          color:white;
          text-decoration:none;
          border-radius:8px;
        "
      >
        View Product
      </a>

    </div>

  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"TrackKart" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

async function sendOtpEmail(to, name, otp) {
  const html = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial;background:#f5f5f5;padding:30px;">

    <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:30px;">

      <h1 style="color:#7C3AED;">TrackKart</h1>

      <h2>Hi ${name},</h2>

      <p>Use the code below to verify your email address and finish creating your TrackKart account.</p>

      <div style="
        margin:24px 0;
        padding:18px 24px;
        background:#f1f0ff;
        border-radius:10px;
        text-align:center;
        font-size:32px;
        font-weight:700;
        letter-spacing:6px;
        color:#5B21B6;
      ">
        ${otp}
      </div>

      <p>This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>

    </div>

  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"TrackKart" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your TrackKart verification code",
    html,
  });
}

module.exports = sendEmail;
module.exports.sendOtpEmail = sendOtpEmail;