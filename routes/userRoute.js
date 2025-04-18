const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', protect, registerUser);
router.post('/login', protect, loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;
