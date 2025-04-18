require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields!"
            });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists!'
            });
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hash
        });

        await newUser.save();

        const { password: _, ...userData } = newUser._doc;

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: userData,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        const { password: _, ...userData } = user._doc;

        res.status(200).json({
            success: true,
            message: 'Welcome!',
            userData,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};
