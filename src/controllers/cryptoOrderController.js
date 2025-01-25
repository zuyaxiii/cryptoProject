import cryptoOrderService from '../services/cryptoOrderService.js';

export const handleCreateCryptoOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await cryptoOrderService.createCryptoOrder(orderData);
    res.status(201).json({
      message: 'Crypto order created successfully',
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create crypto order',
      error: error.message,
    });
  }
};

export const handleDeleteCryptoOrder = async (req, res) => {
  try {
    const { orderID } = req.params;
    const isDeleted = await cryptoOrderService.deleteCryptoOrder(orderID);
    if (isDeleted) {
      res.status(200).json({ message: 'Crypto order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Crypto order not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete crypto order',
      error: error.message,
    });
  }
};
