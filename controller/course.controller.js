import { Course, User, Purchase } from '../models/index.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
            .select('title description price thumbnail creatorId')
            .populate({
                path: 'creatorId',
                select: 'name'
            })
            .lean();

        return res.json({
            message: 'All courses fetched successfully',
            courses
        });
    } catch (error) {
        console.error('Get all courses error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId)
            .select('title description price thumbnail')
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

export const buyCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ 
                message: 'Course not found' 
            });
        }

        const existingPurchase = await Purchase.findOne({ user: userId, course: courseId });
        if (existingPurchase) {
            return res.status(409).json({ 
                message: 'Course already purchased' 
            });
        }

        const purchase = await Purchase.create({
            user: userId,
            course: courseId
        });

        return res.status(201).json({
            message: 'Course purchased successfully',
            purchaseId: purchase._id
        });
    } catch (error) {
        console.error('Buy course error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};