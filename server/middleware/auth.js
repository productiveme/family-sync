import jwt from 'jsonwebtoken';
import { getCollection } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id || user.id,
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
    const users = await getCollection('users');
    const user = await users.findOne({ _id: decoded.id });
    
    return user;
  } catch (error) {
    return null;
  }
};
