import express from 'express';
import { createTransaction } from '../controllers/transactionController.js'
import authenticateToken from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/transaction', authenticateToken , createTransaction);

export default router;
