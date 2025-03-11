import express from 'express';
import { submitQuery, getQueries } from '../controller/queryController.js';
import authMiddleware from '../middleware/authMiddlWare.js'; // You can add authentication if needed

const router = express.Router();

// Route to handle query submission (POST request)
router.post('/submit', submitQuery);

// Route for the admin to get all queries (GET request)
router.get('/all', authMiddleware, getQueries);

export default router;
