require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const User = require('./models/User');

const PORT = process.env.PORT || 5000;

const start = async () => {
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
    console.log(`Server running on port ${PORT}`);
  });
};

start();
