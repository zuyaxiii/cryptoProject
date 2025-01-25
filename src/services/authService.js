import bcrypt from 'bcrypt';
import TokenService from '../config/jwt.js';
import UserService from './userService.js';

class AuthService {
  static async login(email, password) {
    const user = await UserService.getUserByEmail(email); 

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = TokenService.generateToken({ userId: user.UserID, email: user.Email });

    return {
      token,
      user: {
        UserID: user.UserID,
        Username: user.Username,
        Email: user.Email,
        CountryCode: user.CountryCode,
        KYCStatus: user.KYCStatus,
      },
    };
  }

  static verifyToken(token) {
    try {
      return TokenService.verifyToken(token);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static refreshToken(token) {
    try {
      return TokenService.refreshToken(token);
    } catch (error) {
      throw new Error('Unable to refresh token');
    }
  }
}

export default AuthService;