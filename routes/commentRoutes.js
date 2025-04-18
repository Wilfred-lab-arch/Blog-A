const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');

// Routes nested under post
router.post('/:postId', addComment);
router.get('/:postId', getComments);
router.delete('/delete/:id', deleteComment);

module.exports = router;

