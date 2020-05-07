const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express()

// Set Security HTTP Headers
app.use(helmet())

// Allow cors
app.use(cors())

// Limit Request from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!' 
})

app.use('/api', limiter)

// Body Parser -> Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
//  Cookie Parser
app.use(cookieParser())

// Data sanitize against NoSQL Query Injection
app.use(mongoSanitize()) // Checks the request headers, query strings, params for malicious codes

// Data sanitize against XSS
app.use(xss()) // Cleans user input from malicious HTML codes

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
 }

// ROUTERS
 const userRouter = require('./routes/userRoutes');
 const subjectRouter = require('./routes/subjectRoutes');
 const categoryRouter = require('./routes/categoryRoutes');
 const bookingRouter = require('./routes/bookingRoutes');

// Routes Middlewares
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/bookings', bookingRouter);

// Unhandles Routes
app.all('*', (req, res, next) => {
    next(
      new AppError(`Can't find resource ${req.originalUrl} on this server`, 404)
    );
  });

  // Global Error Handler
app.use(globalErrorHandler);

module.exports = app