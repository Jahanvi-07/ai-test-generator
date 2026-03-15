const path = require('path');
// Load .env file from the backend directory
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const User = require('./models/User');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // ensure default admin exists
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPass = process.env.DEFAULT_ADMIN_PASSWORD;
    if (adminEmail && adminPass) {
      const existing = await User.findOne({ email: adminEmail });
      if (!existing) {
        await User.create({ name: 'Admin', email: adminEmail, password: adminPass, role: 'admin' });
        console.log('Default admin created:', adminEmail);
      }
    }
    
    app.listen(PORT, () => {
      console.log("Mongo URI:", process.env.MONGO_URI);
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Loaded' : '❌ Missing'}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`\n❌ ERROR: Port ${PORT} is already in use!`);
      console.error(`\n💡 Solution:`);
      console.error(`   Option 1: Kill the process using port ${PORT}`);
      console.error(`   Run this command: netstat -ano | findstr :${PORT}`);
      console.error(`   Then kill the process: taskkill /PID <PID> /F`);
      console.error(`\n   Option 2: Use a different port`);
      console.error(`   Set PORT=5001 in your .env file`);
      process.exit(1);
    } else {
      console.error('❌ Server startup error:', error);
      process.exit(1);
    }
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

start();
