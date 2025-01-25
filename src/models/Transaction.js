import { DataTypes } from 'sequelize';
import DBconnection from '../config/database.js';
import User from './User.js';

const Transaction = DBconnection.define('Transaction', {
  TransactionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  SenderUserID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID'
    },
    allowNull: true
  },
  ReceiverUserID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: User,
        key: 'UserID',
    }
},
  Amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Currency: {
    type: DataTypes.STRING(10),
    allowNull: true, 
  },
  CryptoCurrency: {
    type: DataTypes.STRING(10),
    allowNull: true, 
  },
  TransactionType: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  TransactionFee: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  ExternalWalletAddress: {
    type: DataTypes.STRING(255),
    allowNull: true, 
  },
  Status: {
    type: DataTypes.STRING(20),
    allowNull: false, 
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false 
});

export default Transaction;
