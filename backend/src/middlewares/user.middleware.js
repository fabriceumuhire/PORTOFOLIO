/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

export const Authenticate = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: 'Wrong email' });
  }
  const pass = await bcrypt.compare(req.body.password, user.password);
  if (!pass) {
    return res.status(401).json({ message: 'Wrong password' });
  }
  next();
};

export const emailExist = async (req, res, next) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    return res.status(400).json({ error: 'Email exists already' });
  }
  next();
};
