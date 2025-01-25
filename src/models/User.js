import { DataTypes } from 'sequelize';
import DBconnection from '../config/database.js';

const User = DBconnection.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Username: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  PasswordHash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  CountryCode: DataTypes.STRING(3),
  KYCStatus: {
    type: DataTypes.ENUM('Verified', 'Pending', 'Failed'),
    defaultValue: 'Pending'
  }
}, {
  timestamps: true,
  createdAt: 'CreatedAt'
});

export default User;
