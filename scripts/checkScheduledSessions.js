const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const ScheduledSession = require('../models/ScheduledSession');
const User = require('../models/User');
require('dotenv').config();

async function checkScheduledSessions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const now = new Date();
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60000);

    // Find sessions scheduled for 30 minutes from now
    const upcomingSessions = await ScheduledSession.find({
      scheduledDate: {
        $gte: now,
        $lte: thirtyMinutesFromNow
      },
      status: 'pending'
    }).populate('userId');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    for (const session of upcomingSessions) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: session.userId.email,
        subject: 'Study Session Reminder',
        html: `
          <h2>Study Session Reminder</h2>
          <p>Your study session for ${session.moduleName} is scheduled to begin in 30 minutes.</p>
          <p>Please prepare for your study session.</p>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`Reminder sent for session ${session._id}`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error checking scheduled sessions:', error);
  }
}

// Run the check every 5 minutes
setInterval(checkScheduledSessions, 5 * 60 * 1000);
checkScheduledSessions(); // Run immediately on startup 