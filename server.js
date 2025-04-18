require('dotenv').config()
// Debugging the JWT_SECRET_KEY from .env
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
console.log("typeof JWT_SECRET_KEY:", typeof process.env.JWT_SECRET_KEY);
const express = require('express');
//extract jwt
const jwt = require('jsonwebtoken');

const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/', userRoutes, postRoutes, commentRoutes);



// Routes placeholder
app.get('/', (req, res) => {
  res.send('Welcome to Blog-A, we love to see you have a wonderful blogging experience');
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is listening on PORT:${PORT}`));

