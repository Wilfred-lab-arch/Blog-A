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
const { authMiddleware }= require('../middlewares/authMiddleware');

router.post('/createpost', authMiddleware, createPost);
router.get('/getposts', getPosts);
router.get('/getpost:slug', getPost);
router.put('/updatepost:slug', authMiddleware, updatePost);
router.delete('/deletepost:slug', deletePost);
router.get('/category/:category', getPostsByCategory);
router.get('/tag/:tag', getPostsByTag);
router.put('/:slug/like', likePost);



module.exports = router;
