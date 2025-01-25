import Transaction from '../models/Transaction.js';
import FiatWallet from '../models/FiatWallet.js';
import CryptoWallet from '../models/CryptoWallet.js';
import DBconnection from '../config/database.js';

const createTransaction = async (senderUserID, transactionData) => {
    const transaction = await DBconnection.transaction();

    try {
        if (!transactionData.Amount || transactionData.Amount <= 0) {
            throw new Error('Invalid transaction amount');
        }

        const senderWallet = transactionData.Currency
            ? await FiatWallet.findOne({ where: { UserID: senderUserID, Currency: transactionData.Currency }, transaction })
            : await CryptoWallet.findOne({
                where: { UserID: senderUserID, CryptoCurrency: transactionData.CryptoCurrency }, transaction
            });

        if (!senderWallet || senderWallet.Balance < transactionData.Amount + (transactionData.TransactionFee || 0)) {
            throw new Error('Insufficient balance');
        }

        senderWallet.Balance = parseFloat(senderWallet.Balance) - (parseFloat(transactionData.Amount) + parseFloat(transactionData.TransactionFee || 0));
        await senderWallet.save({ transaction });

        if (transactionData.ExternalWalletAddress) {
            console.log(`Sending ${transactionData.Amount} ${transactionData.CryptoCurrency || transactionData.Currency} to external wallet: ${transactionData.ExternalWalletAddress}`);

        } else if (transactionData.ReceiverUserID) {
            let receiverWallet = transactionData.Currency
                ? await FiatWallet.findOne({
                    where: {
                        UserID: transactionData.ReceiverUserID,
                        Currency: transactionData.Currency
                    }, transaction
                })
                : await CryptoWallet.findOne({
                    where: {
                        UserID: transactionData.ReceiverUserID,
                        CryptoCurrency: transactionData.CryptoCurrency
                    }, transaction
                });

            if (!receiverWallet) {
                throw new Error('Receiver wallet not found');
            }

            receiverWallet.Balance = parseFloat(receiverWallet.Balance) + parseFloat(transactionData.Amount);
            await receiverWallet.save({ transaction });
        }

        const transactionRecord = await Transaction.create({
            SenderUserID: senderUserID,
            ReceiverUserID: transactionData.ExternalWalletAddress ? null : transactionData.ReceiverUserID, 
            ExternalWalletAddress: transactionData.ExternalWalletAddress || null,
            Amount: transactionData.Amount,
            Currency: transactionData.Currency,
            CryptoCurrency: transactionData.CryptoCurrency,
            TransactionType: transactionData.TransactionType,
            TransactionFee: transactionData.TransactionFee || 0.1,
            Status: 'Completed',
        }, { transaction });

        await transaction.commit();
        return { success: true, transaction: transactionRecord };

    } catch (error) {
        await transaction.rollback();
        console.log('Error:', error.message);
        return { success: false, error: error.message };
    }
};

export default { createTransaction };
