const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Post = require('../Models/postModel');
const net = require('net');
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
const desiredPort = 50051; // Replace with your desired port

const checkPortAvailability = (port, callback) => {
    const tester = net.createServer()
        .once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                callback(null, false);
            } else {
                callback(err);
            }
        })
        .once('listening', () => {
            tester.once('close', () => callback(null, true)).close();
        })
        .listen(port);
};

checkPortAvailability(desiredPort, (err, isAvailable) => {
    if (err) {
        console.error("Error checking port availability:", err);
        return;
    }

    if (isAvailable) {
        server.bindAsync(
            `0.0.0.0:${desiredPort}`,
            grpc.ServerCredentials.createInsecure(),
            (bindErr, port) => {
                if (bindErr) {
                    console.error("Error binding server:", bindErr);
                    return;
                }
                console.log(`Server started on port ${port}`);
                // Start listening for requests
            }
        );
    } else {
        console.log(`Port ${desiredPort} is already in use. Server not started.`);
    }
});

module.exports = { server };