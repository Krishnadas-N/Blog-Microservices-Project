const jwt = require('jsonwebtoken');
const { userClient } = require('./checkUserExists');

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(token)
    jwt.verify(token, 'your_secret_key', (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const userId=user.userId
        console.log(userClient.CheckUserExists)
        userClient.CheckUserExists({ userId }, (grpcError, response) => {
            if (grpcError) {
                console.error('gRPC Error:', grpcError);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (response.exists) {
                console.log(response);
                req.userId = user.userId;
                next();
            } else {
                return res.status(403).json({ message: 'User does not exist' });
            }
        });
    });
};

module.exports ={authenticateToken}
