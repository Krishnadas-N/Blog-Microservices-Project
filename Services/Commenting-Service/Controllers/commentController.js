const Comment = require('../Models/Comments');
const { PostClient } = require('../middlewares/checkPostExists');
const { userClient } = require('../middlewares/checkUserExists');

exports.createComment = async (req, res) => {
  try {
    // Call the gRPC method to check if the post exists
    console.log("commetn add");
    console.log(req.body,req.body.postId);
    const { exists } = await PostClient.CHECKPOSTEXISTS({ postId: req.body.postId });
    console.log(exists);
    const {content,postId} =req.body;
    console.log(req.body);
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


const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    if (!comments) {
      throw new Error("Post Doesn't Exist");
    }
    if (comments.length === 0) {
      throw new Error("No comments for this post");
    } else {
      const formattedComments = [];
      await asyncForEach(comments, async (comment) => {
        try {
          const userDetails = await new Promise((resolve, reject) => {
            userClient.GetUsers({ userId: comment.commenter }, (grpcError, userDetails) => {
              if (grpcError) {
                reject(grpcError);
              } else {
                resolve(userDetails);
              }
            });
          });

          if (!userDetails.username) {
            throw new Error("User does not exist");
          }

          // Replace commenter ID with username
          const formattedComment = {
            comment: comment.content,
            author: userDetails.username
          };
          formattedComments.push(formattedComment);
        } catch (error) {
          console.error("gRPC Error:", error);
          throw new Error("Internal Server Error");
        }
      });

      res.status(200).json({ success: true, data: formattedComments });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, data: err.message });
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
