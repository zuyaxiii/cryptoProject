import bcrypt from 'bcrypt';
import User from '../models/User.js';
import WalletService from '../services/walletService.js';
import { countryCurrencyMap } from '../constants/countryCurrencyMap.js';

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const createUserWallet = async (userId, countryCode) => {
    const defaultCurrency = countryCurrencyMap[countryCode] || 'THB';
    return WalletService.createFiatWallet(userId, defaultCurrency);
};

const UserService = {
    createUserWithWallets: async ({
        Username,
        Email,
        Password,
        CountryCode,
        KYCStatus,
    }) => {
        try {
            const PasswordHash = await hashPassword(Password);

            const user = await User.create({
                Username,
                Email,
                PasswordHash,
                CountryCode,
                KYCStatus,
            });

            await createUserWallet(user.UserID, CountryCode);

            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    },


    getAllUsers: async () => {
        return User.findAll({
            include: [
                {
                    association: 'FiatWallets',
                    attributes: ['Currency', 'Balance'],
                },
                {
                    association: 'CryptoWallets',
                    attributes: ['CryptoCurrency', 'Balance'],
                },
            ],
        });
    },
    getUserById: async (userId) => {
        try {
            const user = await User.findOne({
                where: { UserID: userId },
                include: [
                    {
                        association: 'FiatWallets',
                        attributes: ['Currency', 'Balance'],
                    },
                    {
                        association: 'CryptoWallets',
                        attributes: ['CryptoCurrency', 'Balance'],
                    },
                ],
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Error fetching user');
        }
    },

    updateUser: async (userId, { Username, Email, Password, CountryCode, KYCStatus }, authenticatedUserId) => {
        try {
            if (parseInt(userId) !== authenticatedUserId) {
                throw new Error('Unauthorized');
            }

            const updates = { Username, Email, CountryCode, KYCStatus };

            if (Password) {
                updates.PasswordHash = await hashPassword(Password);
            }

            const [updated] = await User.update(updates, { where: { UserID: userId } });

            if (updated) {
                return User.findOne({ where: { UserID: userId } });
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    },

    deleteUser: async (userId, authenticatedUserId) => {
        try {
            if (userId !== authenticatedUserId) {
                throw new Error('Unauthorized');
            }

            const deleted = await User.destroy({ where: { UserID: userId } });

            return deleted > 0;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Error deleting user');
        }
    },
    getUserByEmail: async (email) => {
        try {
            const user = await User.findOne({ where: { Email: email } });
            return user;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Error fetching user by email');
        }
    },
};

export default UserService;
