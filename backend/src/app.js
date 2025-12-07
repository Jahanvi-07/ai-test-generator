const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const routes = require('./routes');

app.use('/api', routes);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ ok: true, message: 'AI Test Generator API' }));

app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
