import cryptoPriceService from '../services/cryptoPriceService.js';

export const createCryptoPriceController = async (req, res) => {
  const { symbol, currentPrice, marketCap } = req.body;
  try {
    const newCryptoPrice = await cryptoPriceService.createCryptoPrice(symbol, currentPrice, marketCap);
    return res.status(201).json({
      message: 'Crypto Price created successfully',
      data: newCryptoPrice,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating crypto price',
      error: error.message,
    });
  }
};

export const deleteCryptoPriceController = async (req, res) => {
  const { cryptoID } = req.params;
  try {
    const result = await cryptoPriceService.deleteCryptoPrice(cryptoID);
    if (result) {
      return res.status(200).json({
        message: 'Crypto Price deleted successfully',
      });
    } else {
      return res.status(404).json({
        message: 'Crypto Price not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting crypto price',
      error: error.message,
    });
  }
};
