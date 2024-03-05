// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const postController = require('./Controllers/postControllers');
const { authenticateToken } = require('./middlewares/Authentication');
const { server } = require('./grpcSevrices/CheckPostExists');
const multer = require('multer');
const { fileUpload } = require('./Utils/firebaseSetup');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors({
  origin: '*'
}));

app.post('/posts/',authenticateToken,upload.single('post'), fileUpload);
app.get('/posts/',authenticateToken, postController.getAllPosts);
app.get('/posts/:id',authenticateToken, postController.getSinglPost)
app.patch('/posts/:id',authenticateToken, postController.updatePost);
app.delete('/posts/:id',authenticateToken, postController.deletePost);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDb')
  .then(() => {
    console.log('Connected to MongoDB');

  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
