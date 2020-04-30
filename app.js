const express = require('express')
const morgan = require('morgan')

const app = express()


// Body Parser -> Reading data from body into req.body
app.use(express.json())

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
 }


// Unhandles Routes
app.all('*', (req, res, next) => {
    next(
      new AppError(`Can't find resource ${req.originalUrl} on this server`, 404)
    );
  });

module.exports = app