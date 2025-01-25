import CryptoOrder from '../models/CryptoOrder.js';

const cryptoOrderService = {

    createCryptoOrder: async (orderData) => {
        try {
            const newOrder = await CryptoOrder.create(orderData);
            return newOrder;
        } catch (error) {
            console.error('Error creating crypto order:', error);
            throw new Error('Unable to create crypto order');
        }
    },
    deleteCryptoOrder: async (orderID) => {
        try {
            const deletedCount = await CryptoOrder.destroy({
                where: { OrderID: orderID },
            });
            return deletedCount > 0;
        } catch (error) {
            console.error('Error deleting crypto order:', error);
            throw new Error('Unable to delete crypto order');
        }
    }

}

export default cryptoOrderService;