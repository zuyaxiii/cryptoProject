import pkg from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const { sign, verify } = pkg;

class TokenService {
  static SECRET_KEY = process.env.JWT_SECRET || this.generateFallbackSecret();

  static generateFallbackSecret() {
    console.warn('Using generated fallback JWT secret. Set JWT_SECRET in environment.');
    return randomBytes(64).toString('hex');
  }

  static generateToken(payload, expiresIn = '1h') {
    return sign(payload, this.SECRET_KEY, { 
      expiresIn,
      algorithm: 'HS256' 
    });
  }

  static verifyToken(token) {
    try {
      return verify(token, this.SECRET_KEY);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      }
      throw error;
    }
  }

  static refreshToken(token, newExpiresIn = '1h') {
    try {
      const decoded = this.verifyToken(token);
      const { userId, ...rest } = decoded;
      return this.generateToken({ userId, ...rest }, newExpiresIn);
    } catch (error) {
      throw new Error('Cannot refresh invalid token');
    }
  }
}

export default TokenService;