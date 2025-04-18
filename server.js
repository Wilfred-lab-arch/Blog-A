const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config()
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


// Load environment variables
dotenv.config();



// Connect to DB
connectDB();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/', userRoutes);
app.use('/api/', postRoutes);
app.use('/api/', commentRoutes);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Welcome to Blog-A, we love to see you have a wonderful blogging experience');
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is listening on PORT:${PORT}`));

