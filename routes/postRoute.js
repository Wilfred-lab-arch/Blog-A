const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getPostsByCategory,
  getPostsByTag,
  likePost,
} = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/createposts', protect, createPost);
router.get('/getposts', getPosts);
router.get('/getpost:slug', getPost);
router.put('/updatepost:slug', protect, updatePost);
router.delete('/deletepost:slug', protect, deletePost);
router.get('/category/:category', getPostsByCategory);
router.get('/tag/:tag', getPostsByTag);
router.put('/:slug/like', protect, likePost);



module.exports = router;
