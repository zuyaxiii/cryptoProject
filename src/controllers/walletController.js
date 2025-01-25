import WalletService from '../services/walletService.js';
import { sendResponse } from '../utils/response.js';

export const createFiatWallet = async (req, res) => {
  const { userId, currency } = req.body; 

  try {
    const fiatWallet = await WalletService.createFiatWallet(userId, currency); 
    sendResponse(res, 201, { fiatWallet }, 'Fiat wallet created successfully');
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error creating fiat wallet');
  }
};

export const createCryptoWallet = async (req, res) => {
  const { cryptoCurrency } = req.body;
  const { userId } = req.user;

  try {
    const cryptoWallet = await WalletService.createCryptoWallet(req, cryptoCurrency);
    sendResponse(res, 201, { cryptoWallet }, 'Crypto wallet created successfully');
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error creating crypto wallet');
  }
};

export const getFiatWallet = async (req, res) => {
  const { currency } = req.params;
  const { userId } = req.user;

  try {
    const fiatWallet = await WalletService.getFiatWallet(req, currency); 
    if (fiatWallet) {
      sendResponse(res, 200, { fiatWallet });
    } else {
      sendResponse(res, 404, {}, 'Fiat wallet not found');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error fetching fiat wallet');
  }
};

export const getCryptoWallet = async (req, res) => {
  const { cryptoCurrency } = req.params;  
  const { userId } = req.user;       

  try {
    const cryptoWallet = await WalletService.getCryptoWallet(req, cryptoCurrency);
    if (cryptoWallet) {
      sendResponse(res, 200, { cryptoWallet });
    } else {
      sendResponse(res, 404, {}, 'Crypto wallet not found');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error fetching crypto wallet');
  }
};

export const updateFiatWalletBalance = async (req, res) => {
  const { currency } = req.params; 
  const { amount } = req.body; 
  const { userId } = req.user;  

  try {
    const updatedWallet = await WalletService.updateFiatWallet(userId, currency, amount);  
    sendResponse(res, 200, { updatedWallet }, 'Fiat wallet balance updated successfully');
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error updating fiat wallet balance');
  }
};

export const updateCryptoWalletBalance = async (req, res) => {
  const { cryptoCurrency } = req.params;
  const { amount } = req.body;  
  const { userId } = req.user;                   

  try {
    const updatedWallet = await WalletService.updateCryptoWallet(userId, cryptoCurrency, amount, 'crypto');  
    sendResponse(res, 200, { updatedWallet }, 'Crypto wallet balance updated successfully');
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error updating crypto wallet balance');
  }
};

export const deleteFiatWallet = async (req, res) => {
  const { currency } = req.params;
  const { userId } = req.user;    

  try {
    const deleted = await WalletService.deleteFiatWallet(req, currency); 
    if (deleted) {
      sendResponse(res, 200, {}, 'Fiat wallet deleted successfully');
    } else {
      sendResponse(res, 404, {}, 'Fiat wallet not found');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error deleting fiat wallet');
  }
};

export const deleteCryptoWallet = async (req, res) => {
  const { cryptoCurrency } = req.params;  
  const { userId } = req.user;          

  try {
    const deleted = await WalletService.deleteCryptoWallet(req, cryptoCurrency);  
    if (deleted) {
      sendResponse(res, 200, {}, 'Crypto wallet deleted successfully');
    } else {
      sendResponse(res, 404, {}, 'Crypto wallet not found');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error deleting crypto wallet');
  }
}