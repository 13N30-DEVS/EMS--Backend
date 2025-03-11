import express from 'express';
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from '../controller/departmentController.js';
import authMiddleWare from '../middleware/authMiddlWare.js'

const router = express.Router();



router.get('/', authMiddleWare, getDepartments);
router.post('/add', authMiddleWare, addDepartment);
router.get('/:id', authMiddleWare, getDepartment);
router.put('/:id', authMiddleWare, updateDepartment);
router.delete('/:id', authMiddleWare, deleteDepartment);

export default router;
