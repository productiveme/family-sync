import jwt from 'jsonwebtoken';
import { UsersService } from '../services/database.service.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const userService = new UsersService();

export const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userService.findById(decoded.id);
    return user;
  } catch (error) {
    return null;
  }
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
