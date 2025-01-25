import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DBconnection from './src/config/database.js'
import userRoutes from './src/routers/userRoutes.js'
import authRoutes from './src/routers/authRoutes.js'
import walletRoutes from './src/routers/walletRoutes.js'
import cryptoPriceRoutes from './src/routers/cryptoPriceRoutes.js'
import cryptoOrderRoutes from './src/routers/cryptoOrderRoutes.js'
import transactionRoutes from './src/routers/transactionRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

DBconnection.sync()

  app.use('/api', authRoutes); 
  app.use('/api', userRoutes); 
  app.use('/api/wallets', walletRoutes);
  app.use('/api/crypto-price', cryptoPriceRoutes);
  app.use('/api', cryptoOrderRoutes);
  app.use('/api', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
