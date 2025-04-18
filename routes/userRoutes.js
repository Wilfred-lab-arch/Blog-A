// routes/userRoutes.js or similar
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/register', authMiddleware, userController.register);
router.post('/login', authMiddleware, userController.login);



module.exports = router;


