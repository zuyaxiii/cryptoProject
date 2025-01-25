import { DataTypes } from 'sequelize';
import DBconnection from '../config/database.js';
import User from './User.js';

const CryptoWallet = DBconnection.define('CryptoWallet', {
  WalletID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID'
    }
  },
  CryptoCurrency: {
    type: DataTypes.STRING(10),
    allowNull: false 
  },
  Balance: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: true,
  createdAt: 'CreatedAt'
});

export default CryptoWallet;
