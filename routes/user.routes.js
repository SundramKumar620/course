import express from 'express';
import { userMiddleware } from '../middleware/user.middleware.js';
import { register, login, getUserPurchases } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/purchases', userMiddleware, getUserPurchases);

export default router;