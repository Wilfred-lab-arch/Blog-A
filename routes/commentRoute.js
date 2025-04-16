const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');

// Routes nested under post
router.post('/:postId', protect, addComment);
router.get('/:postId', getComments);
router.delete('/delete/:id', protect, deleteComment);

module.exports = router;

