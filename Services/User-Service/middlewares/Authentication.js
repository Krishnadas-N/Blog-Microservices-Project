const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'your_secret_key', (error, decodedToken) => {
        if (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const userId = decodedToken.userId;
        User.findById(userId)
            .then((userProfile) => {
                if (!userProfile) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
                req.user = userProfile; // Attach the user profile to the request
                next(); // Proceed to the next middleware
            })
            .catch((error) => {
                // Handle database retrieval errors
                console.error('Error retrieving user profile:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    });
};

module.exports = { authenticateToken };
