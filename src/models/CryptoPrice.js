import { DataTypes } from 'sequelize';
import DBconnection from '../config/database.js';

const CryptoPrice = DBconnection.define('CryptoPrice', {
  CryptoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Symbol: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  CurrentPrice: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  MarketCap: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  CreatedAt: {  
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'CryptoPrices',
  timestamps: false, 
  hooks: {
    beforeUpdate: (cryptoPrice) => {
      cryptoPrice.updatedAt = new Date(); 
    }
  }
});

export default CryptoPrice;
