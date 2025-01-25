import express from 'express';
import * as WalletController from '../controllers/walletController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create/fiat', WalletController.createFiatWallet);

router.post('/create/crypto', authenticateToken, WalletController.createCryptoWallet);

router.put('/update/fiat/:currency', authenticateToken, WalletController.updateFiatWalletBalance);

router.put('/update/crypto/:cryptoCurrency', authenticateToken, WalletController.updateCryptoWalletBalance);

router.delete('/delete/fiat/:currency', authenticateToken, WalletController.deleteFiatWallet);

router.delete('/delete/crypto/:cryptoCurrency', authenticateToken, WalletController.deleteCryptoWallet);

export default router;
