const nodemailer = require("nodemailer");

/**
 * Email Service for sending revision reminders
 * 
 * Environment variables required:
 * - EMAIL_HOST: SMTP host (e.g., smtp.gmail.com)
 * - EMAIL_PORT: SMTP port (e.g., 587)
 * - EMAIL_USER: Email account username
 * - EMAIL_PASS: Email account password or app-specific password
 * - EMAIL_FROM: Sender email address
 * - CLIENT_URL: Frontend URL for problem links
 */

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const isValidEmail = (email) => {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Send revision reminder email (simple signature)
 *
 * @param {string} toEmail - Recipient email address
 * @param {string} problemTitle - Title of the problem
 * @param {string} problemLink - Link to open the problem in the app
 * @returns {Promise<Object>} Email sending result
 */
const sendRevisionReminderEmail = async (toEmail, problemTitle, problemLink) => {
  if (!isValidEmail(toEmail)) {
    throw new Error("Recipient email is missing or invalid.");
  }

  const transporter = createTransporter();

  const subject = `⏰ Time to revise: ${problemTitle}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2563eb;
          margin-top: 0;
        }
        .problem-title {
          font-size: 18px;
          font-weight: bold;
          color: #1e40af;
          margin: 15px 0;
        }
        .message {
          margin: 20px 0;
        }
        .cta-button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h1>🔔 Revision Reminder</h1>

          <div class="message">
            <p>Time for a quick revision to strengthen your understanding! 💪</p>
          </div>

          <div class="problem-title">
            📝 ${problemTitle}
          </div>

          <div style="text-align: center;">
            <a href="${problemLink}" class="cta-button">
              Open Problem →
            </a>
          </div>

          <div class="footer">
            <p>Keep coding, keep growing! 🚀</p>
            <p>- DSA Vault Team</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const textBody = `
Time to revise!

Problem: ${problemTitle}

Open the problem: ${problemLink}

Keep coding, keep growing! 🚀
- DSA Vault Team
  `;

  const info = await transporter.sendMail({
    from: `"DSA Vault" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: subject,
    text: textBody,
    html: htmlBody
  });

  return { success: true, messageId: info.messageId };
};

/**
 * Send revision reminder email for a DSA problem
 * 
 * @param {Object} params - Email parameters
 * @param {string} params.userEmail - Recipient email address
 * @param {string} params.userName - Recipient name
 * @param {string} params.problemTitle - Title of the problem
 * @param {string} params.problemId - Problem ID for generating link
 * @param {number} params.dayNumber - Day number (4 or 7)
 * @returns {Promise<Object>} Email sending result
 */
const sendRevisionReminder = async ({ userEmail, userName, problemTitle, problemId, dayNumber }) => {
  try {
    const transporter = createTransporter();

    // Generate problem link
    const problemLink = `${process.env.CLIENT_URL}/problems/${problemId}`;

    // Email subject
    const subject = `⏰ Time to revise: ${problemTitle}`;

    // Email HTML body
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2563eb;
            margin-top: 0;
          }
          .problem-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
            margin: 15px 0;
          }
          .message {
            margin: 20px 0;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h1>🔔 Revision Reminder</h1>
            
            <p>Hi ${userName},</p>
            
            <div class="message">
              <p>It's been <strong>${dayNumber} days</strong> since you uploaded this problem. Time for a quick revision to strengthen your understanding! 💪</p>
            </div>
            
            <div class="problem-title">
              📝 ${problemTitle}
            </div>
            
            <div class="message">
              <p><strong>Why revise now?</strong></p>
              <ul>
                <li>Spaced repetition helps lock in concepts long-term</li>
                <li>Revisiting problems reveals new insights</li>
                <li>Build confidence and interview readiness</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="${problemLink}" class="cta-button">
                Open Problem →
              </a>
            </div>
            
            <div class="footer">
              <p>Keep coding, keep growing! 🚀</p>
              <p>- DSA Vault Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const textBody = `
Hi ${userName},

It's been ${dayNumber} days since you uploaded this problem. Time for a quick revision to strengthen your understanding!

Problem: ${problemTitle}

Why revise now?
- Spaced repetition helps lock in concepts long-term
- Revisiting problems reveals new insights
- Build confidence and interview readiness

Open the problem: ${problemLink}

Keep coding, keep growing! 🚀
- DSA Vault Team
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"DSA Vault" <${process.env.EMAIL_FROM}>`,
      to: userEmail,
      subject: subject,
      text: textBody,
      html: htmlBody
    });

    console.log(`✅ Reminder email sent to ${userEmail} for "${problemTitle}" (Day ${dayNumber})`);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error(`❌ Failed to send email to ${userEmail}:`, error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Test email configuration
 * Used to verify SMTP settings are correct
 */
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email service is ready to send messages");
    return true;
  } catch (error) {
    console.error("❌ Email service configuration error:", error.message);
    return false;
  }
};

module.exports = {
  sendRevisionReminder,
  sendRevisionReminderEmail,
  testEmailConfig
};
