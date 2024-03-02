// user-service/controllers/UserController.js
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
  register: async (req, res) => {
    try {
      const { username, password ,email} = req.body;
      console.log(req.body)
      // Check if username is already taken
      const existingUser = await User.findOne({ $or:[{username:username},{email:email} ]});
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        username,
        email:email,
        password: hashedPassword
      });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      console.log("login called")
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getDetails:(req,res)=>{
    try{
      console.log(req.user)
      return req.user;
    }catch(err){
      console.log(err);
    }
  }

  // Other user controller methods here
};

module.exports = UserController;
