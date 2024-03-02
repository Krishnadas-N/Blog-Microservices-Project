const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const { PostProxy, userProxy, commentProxy } = require('./routes/Routes'); // Assuming routes are defined elsewhere
const retry = require('retry');

const app = express();

const retryOptions = {
  retries: 3, // Number of retry attempts
  factor: 2, // Exponential backoff factor
  minTimeout: 1000, // Minimum wait time between retries (ms)
  maxTimeout: 10000, // Maximum wait time between retries (ms)
  randomize: true, // Introduce randomness in wait times
};




// app.use(retryMiddleware);

// Optimized middleware usage:
app.use(morgan('combined')); // HTTP request logging
app.use(cors({ 
  origin: '*', 
  credentials: true, // Allow cookies for authenticated requests
  optionsSuccessStatus: 200, // Send a 200 status code for preflight requests
}));

// Route definitions (assuming routes are implemented in `./routes/Routes`):
app.use('/users', userProxy);
app.use('/comments', commentProxy);
app.use('/posts', PostProxy);

// Enhanced error handling middleware with specific error responses:
app.use((err, req, res, next) => {
  if (err instanceof createError.Unauthorized) {
    res.status(err.status).json({ error: 'Authentication failed' }); // Provide specific error message
  } else if (err instanceof createError.ServiceUnavailable) { // Handle retry-related errors
    res.status(err.status).json({ error: 'Service temporarily unavailable' });
  } else {
    next(err); // Forward other errors to the default error handler
  }
});

// Default error handler with logging:
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ error: 'Internal Server Error' }); // Generic error message for the client
});

// Start the server:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
