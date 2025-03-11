import express from 'express';
import { signUp, login } from '../controller/authController.js';

const router = express.Router();

// Signup route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

export default router;
