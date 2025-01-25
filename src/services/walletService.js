import { FiatWallet, CryptoWallet } from '../models/index.js';
import User from '../models/User.js';
import { cryptoCurrencies } from '../constants/cryptoCurrencies.js';

const validateCryptoCurrency = (cryptoCurrency) => {
    const isValidCrypto = cryptoCurrencies.some(
        (crypto) => crypto.symbol === cryptoCurrency
    );
    if (!isValidCrypto) {
        throw new Error(`Invalid cryptocurrency: ${cryptoCurrency}`);
    }
};

const findWallet = async (model, whereClause, includeOptions) => {
    return await model.findOne({ where: whereClause, include: includeOptions });
};

const createWallet = async (model, userId, data, options = {}) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    return model.create({ ...data, UserID: userId }, options);
};

const getWallet = async (model, userId, criteria) => {
    return findWallet(model, { UserID: userId, ...criteria }, {
        model: User,
        attributes: ['Username', 'Email'],
    });
};

const updateWalletBalance = async (model, userId, criteria, amount, isIncrement = false) => {
    const wallet = await getWallet(model, userId, criteria);
    
    if (!wallet) throw new Error('Wallet not found');

    const amountDecimal = parseFloat(amount);
    if (isNaN(amountDecimal)) throw new Error('Invalid amount');

    wallet.Balance = isIncrement 
        ? wallet.Balance + amountDecimal 
        : amountDecimal;

    await wallet.save();
    return wallet;
};

const deleteWallet = async (model, userId, criteria) => {
    const wallet = await getWallet(model, userId, criteria);
    if (!wallet) throw new Error('Wallet not found');

    await wallet.destroy();
    return true;
};

const WalletService = {
    createFiatWallet: async (userId, currency, options = {}) => {
        return createWallet(FiatWallet, userId, {
            Currency: currency,
            Balance: 0,
        }, options);
    },

    createCryptoWallet: async (req, cryptoCurrency, balance = 0) => {
        validateCryptoCurrency(cryptoCurrency);
        const { userId } = req.user;
        return createWallet(CryptoWallet, userId, {
            CryptoCurrency: cryptoCurrency,
            Balance: balance,
        });
    },

    getFiatWallet: async (req, currency) => {
        const { userId } = req.user;
        return getWallet(FiatWallet, userId, { Currency: currency });
    },

    getCryptoWallet: async (req, cryptoCurrency) => {
        const { userId } = req.user;
        validateCryptoCurrency(cryptoCurrency);
        return getWallet(CryptoWallet, userId, { CryptoCurrency: cryptoCurrency });
    },

    updateFiatWallet: async (userId, currency, amount) => {
        if (!userId) {
            throw new Error('userId is required');
        }

        return updateWalletBalance(FiatWallet, userId, { Currency: currency }, amount);
    },

    updateCryptoWallet: async (userId, cryptoCurrency, amount) => {
        if (!userId) {
            throw new Error('userId is required');
        }

        validateCryptoCurrency(cryptoCurrency);
        return updateWalletBalance(CryptoWallet, userId, { CryptoCurrency: cryptoCurrency }, amount);
    },

    deleteFiatWallet: async (req, currency) => {
        const { userId } = req.user;
        return deleteWallet(FiatWallet, userId, { Currency: currency });
    },

    deleteCryptoWallet: async (req, cryptoCurrency) => {
        const { userId } = req.user;
        validateCryptoCurrency(cryptoCurrency);
        return deleteWallet(CryptoWallet, userId, { CryptoCurrency: cryptoCurrency });
    },
};

export default WalletService;
