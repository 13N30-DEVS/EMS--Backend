import express from 'express';
import authMiddleWare from '../middleware/authMiddlWare.js';
import { changePassword } from '../controller/settingController.js';

const router = express.Router();

// Routes for employee-related actions
router.put('/change-password', authMiddleWare, changePassword);

export default router; 