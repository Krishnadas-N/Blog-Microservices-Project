const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Post = require('../Models/postModel');

const packageDefinition  = protoLoader.loadSync(
    path.join(__dirname, '../../protos/post.proto'),
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const  postProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(postProto.POSTSERVICE.service,{
    CHECKPOSTEXISTS: (call, callback) => {
        const postId = call.request.postId;
        Post.findOne({_id : postId})
            .then(post => {
                if(post){
                    callback(null, {exists : true})
                } else {
                    callback(null, {exists : false})
                }
            })
            .catch(err => {
                console.error("Error finding post:", err);
                callback(err); // Pass error to gRPC callback
            });
    }
})

server.bindAsync(
    "0.0.0.0:50051", // Replace with your desired host and port
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error("Error binding server:", err);
            return;
        }
        console.log(`Server started on port ${port}`);
        // Start listening for requests
    }
);

module.exports = {server}