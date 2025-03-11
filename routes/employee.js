import express from 'express';
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId} from '../controller/employeeController.js';
import authMiddleWare from '../middleware/authMiddlWare.js';

const router = express.Router();

// Routes for employee-related actions
router.get('/', authMiddleWare, getEmployees);
router.post('/add', authMiddleWare, upload.single('image'), addEmployee);
router.get('/:id', authMiddleWare, getEmployee);
router.put('/:id', authMiddleWare, updateEmployee);
router.get('/department/:id', authMiddleWare, fetchEmployeesByDepId)
export default router;
