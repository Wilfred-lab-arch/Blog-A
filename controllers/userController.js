const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken.js');
const sendResponse = require('../utils/sendResponse');


// Register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, username, email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  sendResponse(res, 201, true, newUser, 'User created');
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: 'login successful' });

    const token = generateToken(user);
    res.json({ user: { id: user._id, username: user.username, email: user.email, role: user.role }, token });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
  sendResponse(res, 201, true, newUser, 'Profile success');
}  catch (err) {
res.status(500).json({ message: err.message });
}
};