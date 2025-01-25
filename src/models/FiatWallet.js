import { DataTypes } from 'sequelize';
import DBconnection from '../config/database.js';
import User from './User.js';

const FiatWallet = DBconnection.define('FiatWallet', {
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
  Currency: {
    type: DataTypes.STRING(3),
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

export default FiatWallet;
