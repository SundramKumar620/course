import { User, Purchase } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User already exists' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            name: name.trim(),
        });

        return res.status(201).json({
            message: 'User registered successfully',
            userId: newUser._id,
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.USER_JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const getUserPurchases = async (req, res) => {
    try {
        const userId = req.userId;

        const purchases = await Purchase.find({ user: userId })
            .populate({
                path: 'course',
                select: 'title description price thumbnail'
            })
            .lean();

        return res.json({
            message: 'Purchases fetched successfully',
            purchases
        });
    } catch (error) {
        console.error('Get purchases error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};
