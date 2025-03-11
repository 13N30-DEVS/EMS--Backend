import express from 'express';
import { getAttendance, updateAttendance, attendanceReport } from '../controller/attendanceController.js';
import authMiddleware from '../middleware/authMiddlWare.js'
import defaultAttendance from '../middleware/defaultAttendance.js';



const router = express.Router();

router.get('/', authMiddleware, defaultAttendance, getAttendance);
router.put('/update/:employeeId', authMiddleware, updateAttendance);
router.get('/report', authMiddleware, attendanceReport);
export default router;
