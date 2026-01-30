import { Admin, Course } from '../models/index.js';
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

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ 
                message: 'Admin already exists' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            name: name.trim(),
        });

        return res.status(201).json({
            message: 'Admin registered successfully',
            userId: newAdmin._id,
        });
    } catch (error) {
        console.error('Admin registration error:', error);
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

        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.ADMIN_JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const creatorId = req.adminId;

        const courses = await Course.find({ creatorId })
            .select('title description price thumbnail createdAt')
            .lean();

        return res.json({
            message: 'Courses fetched successfully',
            courses
        });
    } catch (error) {
        console.error('Get all courses error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const getCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const creatorId = req.adminId;

        const course = await Course.findOne({ _id: courseId, creatorId })
            .lean();

        if (!course) {
            return res.status(404).json({ 
                message: 'Course not found' 
            });
        }

        return res.json({
            message: 'Course fetched successfully',
            course
        });
    } catch (error) {
        console.error('Get course error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail } = req.body;
        const courseId = req.params.id;
        const creatorId = req.adminId;

        if (!title || !description || !price || !thumbnail) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        const course = await Course.findOneAndUpdate(
            { _id: courseId, creatorId },
            { title, description, price, thumbnail },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ 
                message: 'Course not found' 
            });
        }

        return res.json({
            message: 'Course updated successfully',
            courseId: course._id
        });
    } catch (error) {
        console.error('Update course error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const creatorId = req.adminId;

        const course = await Course.findOneAndDelete({ _id: courseId, creatorId });

        if (!course) {
            return res.status(404).json({ 
                message: 'Course not found' 
            });
        }

        return res.json({
            message: 'Course deleted successfully',
            courseId: course._id
        });
    } catch (error) {
        console.error('Delete course error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const createCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail } = req.body;
        const creatorId = req.adminId;

        if (!title || !description || !price || !thumbnail) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        const existingCourse = await Course.findOne({ title });
        if (existingCourse) {
            return res.status(409).json({ 
                message: 'Course with this title already exists' 
            });
        }

        const newCourse = await Course.create({
            title,
            description,
            price,
            thumbnail,
            creatorId
        });

        return res.status(201).json({
            message: 'Course created successfully',
            courseId: newCourse._id
        });
    } catch (error) {
        console.error('Create course error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};
