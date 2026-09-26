import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authJWT.js';
import { body } from 'express-validator';

const router = Router();

// Public routes
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register
);

router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);

export default router;
