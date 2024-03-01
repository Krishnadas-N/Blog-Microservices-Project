const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const User = require('../models/userSchema');

// Load the gRPC service definition
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../protos/user.proto'));
const userProto = grpc.loadPackageDefinition(packageDefinition);

// Create gRPC server
const server = new grpc.Server();

// Implement the CheckUserExists RPC method
server.addService(userProto.UserService.service, {
    CheckUserExists: async (call, callback) => {
        const userId = call.request.userId;
        // Query the database to check if the user exists
        const user = await User.findOne({ _id: userId });
        if (user) {
            callback(null, { exists: true });
        } else {
            callback(null, { exists: false });
        }
    }
});

// Bind the server to a port and start listening for requests
server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error("Error binding server:", err);
            return;
        }
        console.log(`User gRPC server started on port ${port}`);
    }
);

module.exports = server;
