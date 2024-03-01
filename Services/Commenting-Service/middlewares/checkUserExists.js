const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the gRPC service definition
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../protos/user.proto'));
const userProto = grpc.loadPackageDefinition(packageDefinition);

// Create a gRPC client for the UserService
const userClient = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

module.exports = { userClient };
