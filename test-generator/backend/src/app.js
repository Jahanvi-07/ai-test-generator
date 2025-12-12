const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ✅ MIDDLEWARES FIRST
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// ROOT ROUTE
app.get('/', (req, res) => res.json({ ok: true, message: 'AI Test Generator API' }));

// API HEALTH CHECK
app.get('/api', (req, res) => {
    res.json({ message: "API is working" });
});

// ✅ NOW MOUNT API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Static file serving and catch-all route for frontend (AFTER API routes)
const path = require('path');
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// ERROR HANDLER LAST
app.use(errorHandler);

module.exports = app;
