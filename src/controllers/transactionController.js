import transactionService from '../services/transactionService.js';

export const createTransaction = async (req, res) => {
    const { userId } = req.user;
    const transactionData = req.body;

    try {
        const result = await transactionService.createTransaction(userId, transactionData);

        if (!result.success) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(201).json({
            message: 'Transaction created successfully',
            data: result.transaction
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating transaction',
            error: error.message
        });
    }
};