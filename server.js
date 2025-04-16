const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

// Load environment variables
dotenv.config();



// Connect to DB
connectDB();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Welcome to Blog-A, we love to see you have a wonderful blogging experience');
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

