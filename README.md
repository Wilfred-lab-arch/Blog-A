# Blog-A
The Blog API is a RESTful backend service designed to power a full-featured blogging platform. Built with Node.js, Express, and MongoDB, this API provides endpoints for managing users, blog posts, comments, categories, and more. It supports user authentication and role-based access control, allowing secure content creation and interaction.
✨ Key Features
User Authentication with JWT

Role Management (Admin, Author, Reader)

Post Management (Create, Read, Update, Delete)

Comment System (Add, Delete Comments)

Categories & Tags support

Like & View Counters

Secure REST API with input validation and error handling

Scalable Structure using MVC architecture

🔐 Authentication
The API uses JWT (JSON Web Tokens) for user authentication and provides protected routes for post and comment management, ensuring that only authorized users can perform certain actions.

📦 Technologies Used
Node.js with Express.js

MongoDB with Mongoose

JWT for secure authentication

bcrypt for password hashing

Multer and optional Cloudinary for image uploads

dotenv for environment configuration

blog-api/
│
├── controllers/
│   ├── authController.js
│   ├── postController.js
│   ├── userController.js
│   └── commentController.js
│
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│
├── routes/
│   ├── authRoutes.js
│   ├── postRoutes.js
│   ├── userRoutes.js
│   └── commentRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
│
├── utils/
│   └── slugify.js
│
├── .env
├── server.js
└── config/
    └── db.js
