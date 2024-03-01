const Comment = require('../Models/Comments');
const { PostClient } = require('../middlewares/checkPostExists');

exports.createComment = async (req, res) => {
  try {
    // Call the gRPC method to check if the post exists
    const { exists } = await PostClient.CHECKPOSTEXISTS({ postId: req.body.postId });
    const {content,postId} =-req.body;
    if (exists) {
      // Post exists, proceed to create the comment
      const newComment = new Comment({
        content: content,
        postId: postId,
        commenter: req.userId,
        postId:postId
        });
    
      await newComment.save();
      res.status(201).json({success:true,data:newComment});
    } else {
      // Post does not exist, return an error response
      res.status(404).json({success:false, data: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({success:false,data: err.message });
  }
};


exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    if(!comments){
      throw new Error("Post Doesn't Exist");
    }
    if(comments.length === 0){
      throw new Error("No comments for this post");
    }else{
      res.status(201).json({success:true,data:comments});
    }
    
  } catch (err) {
    res.status(500).json({success:false, data: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({success:false, data: 'Comment not found' });
    }
    if (req.body.content != null) {
      comment.content = req.body.content;
    }
    // Update other fields as needed
  
    await comment.save();
    res.status(201).json({success:true,data:comment});
  } catch (err) {
    res.status(400).json({ success:false,data: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({success:false, data: 'Comment not found' });
    }
    await comment.remove();
    res.json({success:true, data: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({success:false, data: err.message });
  }
};
