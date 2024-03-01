const express = require('express');
const mongoose = require('mongoose');
const commentController = require('./Controllers/commentController');
const { authenticateToken } = require('./middlewares/Authentication');

const app = express();
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogCommentDb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.post('/comments',authenticateToken, commentController.createComment);
app.get('/comments/:postId',authenticateToken, commentController.getCommentsForPost);
app.patch('/comments/:id',authenticateToken, commentController.updateComment);
app.delete('/comments/:id', authenticateToken,commentController.deleteComment);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
