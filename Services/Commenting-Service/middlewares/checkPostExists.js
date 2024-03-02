const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../protos/post.proto'));
const userProto = grpc.loadPackageDefinition(packageDefinition);

const PostClient = new userProto.POSTSERVICE('localhost:50051', grpc.credentials.createInsecure());

module.exports = { PostClient };
