import express from 'express';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import { 
    register, 
    login, 
    getAllCourses, 
    getCourse, 
    updateCourse, 
    deleteCourse, 
    createCourse 
} from '../controller/admin.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/courses', adminMiddleware, createCourse);
router.get('/courses', adminMiddleware, getAllCourses);
router.get('/courses/:id', adminMiddleware, getCourse);
router.put('/courses/:id', adminMiddleware, updateCourse);
router.delete('/courses/:id', adminMiddleware, deleteCourse);

export default router;