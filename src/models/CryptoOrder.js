import { DataTypes } from 'sequelize';
import DBconnection from '../config/database.js';
import User from './User.js';

const CryptoOrder = DBconnection.define('CryptoOrder', {
  OrderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID'
    },
    allowNull: false
  },
  CryptoCurrency: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  OrderType: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  Price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Amount: {
    type: DataTypes.DECIMAL(15, 8),
    allowNull: false
  },
  TotalPrice: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'Pending'
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  CryptoPriceID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'CryptoPrices',  
      key: 'CryptoID'
    },
    allowNull: true
  }
}, {
  tableName: 'CryptoOrders',
  timestamps: false,  
  createdAt: 'CreatedAt', 
  updatedAt: false  
});

export default CryptoOrder;
