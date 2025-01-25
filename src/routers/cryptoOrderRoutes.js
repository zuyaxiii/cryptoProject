import express from 'express';
import { handleCreateCryptoOrder, handleDeleteCryptoOrder } from '../controllers/cryptoOrderController.js';

const router = express.Router();

router.post('/crypto-orders', handleCreateCryptoOrder);
router.delete('/crypto-orders/:orderID', handleDeleteCryptoOrder);

export default router;
