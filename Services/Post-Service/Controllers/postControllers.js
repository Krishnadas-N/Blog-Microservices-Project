const Post = require('../Models/postModel');



exports.getAllPosts = async (req, res) => {
  try {
    const userId = req.userId
    const posts = await Post.find({author:userId});
    if(!posts){
      res.status(404).json({succes:false,data:"No post found"})
    }
    else{
    res.json({succes:true,data:posts});
    }
  } catch (err) {
    res.status(500).json({succes:false, message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (req.body.title != null) {
      post.title = req.body.title;
    }
    if (req.body.content != null) {
      post.content = req.body.content;
    }
    // Update other fields as needed
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const userId = req.userId
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
