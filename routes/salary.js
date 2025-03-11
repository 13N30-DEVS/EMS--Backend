import express from 'express';
import authMiddleWare from '../middleware/authMiddlWare.js';
import {addSalary,getSalary} from '../controller/salaryController.js'

const router = express.Router();

router.post('/add', authMiddleWare, addSalary);
router.get('/:id/:role', authMiddleWare, getSalary);


export default router;
