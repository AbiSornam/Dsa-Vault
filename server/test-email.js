/**
 * Test script to send a test revision reminder email
 * Run with: node test-email.js
 */

require("dotenv").config();
const { sendRevisionReminderEmail, testEmailConfig } = require("./services/emailService");

const runEmailTest = async () => {
  console.log("🧪 Testing Email Service Configuration...\n");

  // Step 1: Test SMTP connection
  console.log("1️⃣ Testing SMTP connection...");
  const isConfigValid = await testEmailConfig();
  
  if (!isConfigValid) {
    console.log("\n❌ Email configuration failed. Please check your .env settings:");
    console.log("   - EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("   - EMAIL_PORT:", process.env.EMAIL_PORT);
    console.log("   - EMAIL_USER:", process.env.EMAIL_USER ? "✓ Set" : "✗ Not set");
    console.log("   - EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Set" : "✗ Not set");
    console.log("   - EMAIL_FROM:", process.env.EMAIL_FROM);
    console.log("\n💡 Make sure to use an App-Specific Password for Gmail (not your regular password)");
    process.exit(1);
  }

  console.log("\n2️⃣ Sending test revision reminder email...");
  
  // Step 2: Send a test email
  const testRecipient = process.env.EMAIL_FROM;
  const testProblemTitle = "Two Sum Problem (Test)";
  const testProblemLink = `${process.env.CLIENT_URL}/problems/test-problem-id-123`;

  const testResult = await sendRevisionReminderEmail(
    testRecipient,
    testProblemTitle,
    testProblemLink
  );

  if (testResult.success) {
    console.log("\n✅ SUCCESS! Test email sent successfully!");
    console.log(`   Message ID: ${testResult.messageId}`);
    console.log(`\n📧 Check your inbox at: ${testRecipient}`);
    console.log("   (Also check spam/junk folder if not in inbox)\n");
  } else {
    console.log("\n❌ FAILED to send test email");
    console.log(`   Error: ${testResult.error}\n`);
  }
};

// Run the test
runEmailTest()
  .then(() => {
    console.log("✅ Email test completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Test failed with error:", error);
    process.exit(1);
  });
