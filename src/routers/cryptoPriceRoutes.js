import express from 'express';
import { createCryptoPriceController, deleteCryptoPriceController } from '../controllers/cryptoPriceController.js';

const router = express.Router();

router.post('/create', createCryptoPriceController);
router.delete('/delete/:cryptoID', deleteCryptoPriceController);

export default router;
