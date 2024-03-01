const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Comment = require('../models/commentModel');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../protos/comment.proto'));
const commentProto = grpc.loadPackageDefinition(packageDefinition);

const commentServer = new grpc.Server();

commentServer.addService(commentProto.CommentService.service, {
    RemoveComments: async (call, callback) => {
        const postId = call.request.postId;
        try {
            // Remove comments associated with the post
            await Comment.deleteMany({ postId });
            callback(null, { success: true });
        } catch (error) {
            console.error("Error removing comments:", error);
            callback(error, { success: false });
        }
    }
});

commentServer.bindAsync(
    "0.0.0.0:50051", // Replace with your desired host and port
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error("Error binding server:", err);
            return;
        }
        console.log(`Comment Server started on port ${port}`);
        // Start listening for requests
        commentServer.start();
    }
);

module.exports = commentServer;