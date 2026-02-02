const cron = require("node-cron");
const Problem = require("../models/Problem");
const User = require("../models/User");
const { sendRevisionReminder } = require("./emailService");

/**
 * Calculate days passed since a given date
 * @param {Date} date - The date to calculate from
 * @returns {number} Number of days passed
 */
const calculateDaysPassed = (date) => {
  const now = new Date();
  const uploadDate = new Date(date);
  const diffTime = Math.abs(now - uploadDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Process revision reminders for all eligible problems
 * Checks each problem and sends reminders for day 4 and day 7 if not already sent
 */
const processRevisionReminders = async () => {
  try {
    console.log("🔄 Starting revision reminder check...");

    // Fetch all problems with user information
    const problems = await Problem.find({}).populate("userId", "email name emailRemindersEnabled");

    let day4Count = 0;
    let day7Count = 0;
    let skippedCount = 0;

    for (const problem of problems) {
      // Skip if problem has no user or user doesn't exist
      if (!problem.userId) {
        console.log(`⚠️  Skipping problem "${problem.title}" - no associated user`);
        continue;
      }

      // Skip if user has disabled email reminders
      if (!problem.userId.emailRemindersEnabled) {
        skippedCount++;
        continue;
      }

      // Use uploadedAt if available, otherwise use createdAt
      const uploadDate = problem.uploadedAt || problem.createdAt;
      const daysPassed = calculateDaysPassed(uploadDate);

      // Initialize revisionRemindersSent if not exists (for old documents)
      if (!problem.revisionRemindersSent) {
        problem.revisionRemindersSent = { day4: false, day7: false };
      }

      // Check for Day 7 reminder (check this first to prioritize it)
      if (daysPassed >= 7 && !problem.revisionRemindersSent.day7) {
        const result = await sendRevisionReminder({
          userEmail: problem.userId.email,
          userName: problem.userId.name,
          problemTitle: problem.title,
          problemId: problem._id,
          dayNumber: 7
        });

        if (result.success) {
          problem.revisionRemindersSent.day7 = true;
          await problem.save();
          day7Count++;
        }
      }
      // Check for Day 4 reminder
      else if (daysPassed >= 4 && !problem.revisionRemindersSent.day4) {
        const result = await sendRevisionReminder({
          userEmail: problem.userId.email,
          userName: problem.userId.name,
          problemTitle: problem.title,
          problemId: problem._id,
          dayNumber: 4
        });

        if (result.success) {
          problem.revisionRemindersSent.day4 = true;
          await problem.save();
          day4Count++;
        }
      }
    }

    console.log(`✅ Revision reminder check completed:`);
    console.log(`   - Day 4 reminders sent: ${day4Count}`);
    console.log(`   - Day 7 reminders sent: ${day7Count}`);
    console.log(`   - Skipped (reminders disabled): ${skippedCount}`);
    console.log(`   - Total problems checked: ${problems.length}`);

  } catch (error) {
    console.error("❌ Error processing revision reminders:", error);
  }
};

/**
 * Initialize the cron job for revision reminders
 * Runs daily at 9:00 AM server time
 * 
 * Cron schedule format: "minute hour * * *"
 * Example: "0 9 * * *" = Every day at 9:00 AM
 */
const startRevisionReminderCron = () => {
  // Schedule: Run daily at 9:00 AM
  const cronSchedule = "0 9 * * *";

  console.log(`🕐 Scheduling revision reminder cron job (${cronSchedule})...`);

  cron.schedule(cronSchedule, () => {
    console.log(`\n⏰ [${new Date().toISOString()}] Running scheduled revision reminder check...`);
    processRevisionReminders();
  });

  console.log("✅ Revision reminder cron job scheduled successfully");
  console.log("   - Schedule: Daily at 9:00 AM server time");
  console.log("   - Job will check for problems needing day 4 or day 7 reminders");

  // Optional: Run immediately on server start for testing (comment out in production)
  // Uncomment the line below to test the cron job immediately when server starts
  // processRevisionReminders();
};

module.exports = {
  startRevisionReminderCron,
  processRevisionReminders // Export for manual testing
};
