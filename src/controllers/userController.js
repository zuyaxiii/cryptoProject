import UserService from '../services/userService.js';
import { sendResponse } from '../utils/response.js';

export const createUser = async (req, res) => {
  const { Username, Email, Password, CountryCode, KYCStatus } = req.body;

  try {
    const user = await UserService.createUserWithWallets({ Username, Email, Password, CountryCode, KYCStatus });
    sendResponse(res, 201, { user }, 'User created successfully');
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error creating user');
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    if (users.length > 0) {
      sendResponse(res, 200, { users });
    } else {
      sendResponse(res, 404, {}, 'No users found');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error fetching users');
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserService.getUserById(id);
    if (user) {
      sendResponse(res, 200, { user });
    } else {
      sendResponse(res, 404, {}, 'User not found');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error fetching user');
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { Username, Email, Password, CountryCode, KYCStatus } = req.body;
  const authenticatedUserId = req.user.userId; 

  try {
    const updatedUser = await UserService.updateUser(id, { Username, Email, Password, CountryCode, KYCStatus }, authenticatedUserId);
    
    if (updatedUser) {
      sendResponse(res, 200, { user: updatedUser }, 'User updated successfully');
    } else {
      sendResponse(res, 404, {}, 'User not found or no changes made');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error updating user');
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await UserService.deleteUser(id);
    if (deleted) {
      sendResponse(res, 200, {}, `User with ID ${id} deleted successfully`);
    } else {
      sendResponse(res, 404, {}, 'User not found');
    }
  } catch (error) {
    sendResponse(res, 500, { error: error.message }, 'Error deleting user');
  }
};