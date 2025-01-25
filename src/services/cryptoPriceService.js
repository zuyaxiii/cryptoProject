import CryptoPrice from '../models/CryptoPrice.js';

const cryptoPriceService = {

    createCryptoPrice : async (symbol, currentPrice, marketCap) => {
        try {
          const newCryptoPrice = await CryptoPrice.create({
            Symbol: symbol,
            CurrentPrice: currentPrice,
            MarketCap: marketCap,
          });
          return newCryptoPrice;
        } catch (error) {
          console.error("Error creating crypto price: ", error);
          throw error;
        }
      },

      deleteCryptoPrice : async (cryptoID) => {
        try {
          const deletedCryptoPrice = await CryptoPrice.destroy({
            where: { CryptoID: cryptoID },
          });
          return deletedCryptoPrice;
        } catch (error) {
          console.error("Error deleting crypto price: ", error);
          throw error;
        }
      }
}

export default cryptoPriceService;