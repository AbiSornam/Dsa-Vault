# Email Revision Reminder System - Setup Guide

## Overview
Automatic email reminders are sent to users on day 4 and day 7 after uploading a DSA problem, encouraging spaced repetition for better retention.

## Environment Variables Required

Add the following to your `.env` file in the `server` directory:

```env
# Email Service Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=your-email@gmail.com

# Frontend URL (for generating problem links in emails)
CLIENT_URL=http://localhost:5173
```

## Gmail Setup Instructions

### 1. Enable 2-Factor Authentication
- Go to Google Account settings: https://myaccount.google.com/
- Navigate to Security → 2-Step Verification
- Enable 2FA if not already enabled

### 2. Generate App-Specific Password
- Go to: https://myaccount.google.com/apppasswords
- Select "Mail" and your device
- Copy the 16-character password (remove spaces)
- Use this as `EMAIL_PASS` in your `.env` file

### 3. Alternative: Less Secure App Access (Not Recommended)
If you don't want to use 2FA:
- Enable "Less secure app access" in Gmail settings
- Use your regular Gmail password as `EMAIL_PASS`

⚠️ **Important**: Never commit your `.env` file to version control!

## Other Email Providers

### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=verified-sender@yourdomain.com
```

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
EMAIL_FROM=your-email@outlook.com
```

### AWS SES
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your-ses-smtp-username
EMAIL_PASS=your-ses-smtp-password
EMAIL_FROM=verified@yourdomain.com
```

## Database Schema Updates

### Problem Model
Added fields:
```javascript
revisionRemindersSent: {
  day4: Boolean (default: false),
  day7: Boolean (default: false)
}
```

### User Model
Added field:
```javascript
emailRemindersEnabled: Boolean (default: true)
```

## Cron Job Configuration

- **Schedule**: Daily at 9:00 AM server time
- **Cron Expression**: `0 9 * * *`
- **Location**: `server/services/revisionReminderCron.js`

### Modify Schedule (if needed)
Edit the `cronSchedule` variable in `revisionReminderCron.js`:

```javascript
// Examples:
const cronSchedule = "0 9 * * *";   // 9:00 AM daily
const cronSchedule = "0 12 * * *";  // 12:00 PM (noon) daily
const cronSchedule = "0 6 * * *";   // 6:00 AM daily
const cronSchedule = "0 */6 * * *"; // Every 6 hours
```

## Testing the System

### 1. Test Email Configuration
Add this route temporarily to test email service:

```javascript
// In server.js or a test route file
const { testEmailConfig } = require("./services/emailService");

app.get("/api/test-email", async (req, res) => {
  const isValid = await testEmailConfig();
  res.json({ emailConfigValid: isValid });
});
```

### 2. Test Manual Reminder Send
To test immediately without waiting for cron:

Uncomment this line in `revisionReminderCron.js` (line 124):
```javascript
processRevisionReminders();
```

This will run the reminder check once when the server starts.

### 3. Monitor Logs
Watch the console output for:
- ✅ Email service ready messages
- 🔄 Reminder check progress
- 📧 Individual email send confirmations
- ❌ Any error messages

## User Preferences

Users can disable email reminders by setting `emailRemindersEnabled` to `false`:

### Example API Endpoint (add to userRoutes.js):
```javascript
router.patch("/email-preferences", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { emailRemindersEnabled: req.body.enabled },
      { new: true }
    );
    res.json({ success: true, emailRemindersEnabled: user.emailRemindersEnabled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## How It Works

1. **Cron Job** runs daily at 9 AM
2. **Fetches** all problems from database
3. **Calculates** days since upload/creation
4. **Checks** if reminders already sent (prevents duplicates)
5. **Verifies** user has `emailRemindersEnabled: true`
6. **Sends** emails for eligible problems:
   - Day 4: If ≥ 4 days passed and `day4` flag is false
   - Day 7: If ≥ 7 days passed and `day7` flag is false
7. **Updates** reminder flags in database after successful send

## Email Content

Each reminder includes:
- ✅ Problem title
- ✅ Day number (4 or 7)
- ✅ Motivational message about spaced repetition
- ✅ Direct link to problem in the app
- ✅ Professional HTML formatting

## Troubleshooting

### Emails Not Sending

1. **Check Environment Variables**
   ```bash
   # In server directory
   node -e "require('dotenv').config(); console.log(process.env.EMAIL_HOST)"
   ```

2. **Verify SMTP Connection**
   - Test with the `/api/test-email` endpoint
   - Check firewall/antivirus settings
   - Ensure correct port (587 for TLS)

3. **Check Gmail Settings**
   - 2FA must be enabled for app passwords
   - App password must be correct (no spaces)
   - Less secure apps enabled (if not using 2FA)

### Problems Not Found

- Check `uploadedAt` field exists on problems
- Falls back to `createdAt` if `uploadedAt` is missing
- Verify problems have valid `userId` references

### Cron Not Running

- Check server logs for "Scheduling revision reminder cron job"
- Verify server time zone matches expected schedule
- Ensure no syntax errors in cron expression

## Production Considerations

1. **Use Professional Email Service**
   - Gmail has sending limits (500/day)
   - Consider SendGrid, AWS SES, or Mailgun for production

2. **Monitor Email Deliverability**
   - Set up SPF, DKIM, and DMARC records
   - Monitor bounce rates
   - Implement unsubscribe functionality

3. **Rate Limiting**
   - Add delays between emails if sending many
   - Batch process large datasets

4. **Error Handling**
   - Log failed sends to database for retry
   - Send admin notifications for system failures

5. **Testing**
   - Test in staging environment first
   - Use test email addresses
   - Verify links work in production domain

## File Structure

```
server/
├── models/
│   ├── Problem.js          (✅ Updated: added revisionRemindersSent)
│   └── User.js             (✅ Updated: added emailRemindersEnabled)
├── services/
│   ├── emailService.js     (✅ New: handles email sending)
│   └── revisionReminderCron.js (✅ New: cron job logic)
└── server.js               (✅ Updated: initializes cron)
```

## Next Steps

1. ✅ Set up environment variables
2. ✅ Configure email provider
3. ✅ Test email service
4. ✅ Monitor first cron run
5. ⬜ Add user preference UI in frontend
6. ⬜ Implement email analytics (optional)
7. ⬜ Add unsubscribe functionality (optional)

---

**Questions or Issues?**
- Check server logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure MongoDB connection is working
- Test with a single problem first before running at scale
