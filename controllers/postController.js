const Post = require('../models/postModel');
const slugify = require('slugify');
const { body, validationResult } = require('express-validator');



// Create Post
exports.createPost = async (req, res) => {
  try {

    const { title, content, tags, category} = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    console.log("Request body:", req.body);
    const post = new Post({
      title,
      slug,
      content,
      tags,
      category,
      author: req.user._id,
    });

    await post.save();
    res.status(201).json({
        success: true,
        message: 'Post created successfully!',
        data: post
    });
  } catch (err) {
    res.status(500).json({ message: err.message });

    

// Middleware for post validation
exports.validatePost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('author').notEmpty().withMessage('Author is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];



  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log("Request body:", req.body);
    const post = new posts({
      username,
      email
    });
    const posts = await Post.find().populate('author', 'username', 'email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Post
exports.getPost = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.views;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ 
              success: false,
            message: 'Internal server error',
            error: err.message });
  }
 
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const { title, content, tags } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: err.message });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.category }).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostsByTag = async (req, res) => {
  try {
    const posts = await Post.find({ tags: req.params.tag }).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes++;
    await post.save();
    res.json({ message: 'Post liked', likes: post.likes });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: err.message });
  }
};
