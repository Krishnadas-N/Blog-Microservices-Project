const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-Route');
const server = require('./grpc-Services/checkUserExists');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));

app.use(morgan('dev'));
app.use(morgan('combined'));

// Routes
app.use('/users', userRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/blogUserDb')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the gRPC server
    server.start();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`User service running on port ${PORT}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));
