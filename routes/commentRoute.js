const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes nested under post
router.post('/:postId', authMiddleware, addComment);
router.get('/:postId', getComments);
router.delete('/delete/:id', authMiddleware, deleteComment);

module.exports = router;

