const mongoose = require('mongoose');
const slugify = require('slugify');
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    tags: [String],
    views: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    
    likes: {
      type: Number,
      default: 0,
    },
    
     views: { 
      type: Number, 
      default: 0 
    },

  },
  { timestamps: true }
);

// Generate slug before saving
postSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  next();
});


postSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
