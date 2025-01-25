import User from '../models/User.js';
import FiatWallet from '../models/FiatWallet.js';
import CryptoWallet from '../models/CryptoWallet.js';
import Transaction from '../models/Transaction.js';
import CryptoOrder from '../models/CryptoOrder.js';
import CryptoPrice from '../models/CryptoPrice.js';

const setupAssociations = () => {
  User.hasMany(FiatWallet, { foreignKey: 'UserID', onDelete: 'CASCADE', hooks: true });
  FiatWallet.belongsTo(User, { foreignKey: 'UserID' });

  User.hasMany(CryptoWallet, { foreignKey: 'UserID', onDelete: 'CASCADE', hooks: true });
  CryptoWallet.belongsTo(User, { foreignKey: 'UserID' });

  Transaction.belongsTo(User, { foreignKey: 'SenderUserID', as: 'Sender', onDelete: 'SET NULL' });
  Transaction.belongsTo(User, { foreignKey: 'ReceiverUserID', as: 'Receiver', onDelete: 'SET NULL' });

  FiatWallet.hasMany(Transaction, { foreignKey: 'SenderUserID' });
  FiatWallet.hasMany(Transaction, { foreignKey: 'ReceiverUserID' });

  CryptoWallet.hasMany(Transaction, { foreignKey: 'SenderUserID' });
  CryptoWallet.hasMany(Transaction, { foreignKey: 'ReceiverUserID' });

  Transaction.hasMany(CryptoOrder, { foreignKey: 'TransactionID', onDelete: 'CASCADE' });
  CryptoOrder.belongsTo(Transaction, { foreignKey: 'TransactionID' });

  CryptoOrder.belongsTo(CryptoPrice, { foreignKey: 'CryptoPriceID' });
  CryptoPrice.hasMany(CryptoOrder, { foreignKey: 'CryptoPriceID' });
};

setupAssociations();

export { User, FiatWallet, CryptoWallet, Transaction, CryptoOrder, CryptoPrice };
