import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const tokenAuth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No authorization' });
  }
  try {
    const verification = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verification;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const tokenGenerator = (user) => {
  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
