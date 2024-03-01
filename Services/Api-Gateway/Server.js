const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const { PostProxy,
  userProxy,
  commentProxy
 } = require('./routes/Routes');
const retry = require('retry');
const app = express();


const retryOptions = {
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 10000,
    randomize: true
};

// Define retry middleware
const retryMiddleware = (req, res, next) => {
    const operation = retry.operation(retryOptions);

    operation.attempt(() => {
        // Simulated backend service request logic
        const randomNumber = Math.random();
        if (randomNumber < 0.8) {
            // Simulate successful response
            next()
        } else {
            // Simulate failure and trigger retry
            const error = new Error('Service unavailable');
            error.statusCode = 503;
            next(error);
        }
    });
};

app.use(retryMiddleware);
// Middleware
app.use(morgan('combined'));
app.use(cors());

// Define routes
app.use('/users', userProxy);
app.use('/comments', commentProxy);
app.use('/posts', PostProxy);

// Error handling middleware for handling authentication errors
app.use((err, req, res, next) => {
  if (err instanceof createError.Unauthorized) {
    res.status(err.status).json({ error: err.message });
  } else {
    next(err); // Forward other errors to the default error handler
  }
});

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
