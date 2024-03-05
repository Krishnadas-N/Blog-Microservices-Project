// user-service/routes/users.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../middlewares/Authentication');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/',authenticateToken, UserController.getDetails);
router.get('/get-user/:id',authenticateToken,UserController.getUser)
// Other user routes

module.exports = router;
