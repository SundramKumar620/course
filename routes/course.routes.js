import express from 'express';
import { userMiddleware } from '../middleware/user.middleware.js';
import { getAllCourses, getCourseById, buyCourse } from '../controller/course.controller.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/:id/buy', userMiddleware, buyCourse);

export default router;