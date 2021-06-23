import bcrypt from 'bcryptjs';
import webtoken from 'jsonwebtoken';
import User from '../models/user.model';

export const getUser = async (req, res) => {
  const user = await User.find();
  return res.status(200).json(user);
};

export const registerUser = async (req, res) => {
  const hashed = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, hashed);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    });
    const savedUser = await user.save();
    return res.status(201).json({ message: savedUser });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const wtoken = webtoken.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ user, token: wtoken });
  } catch (error) {
    return res.status(500).json(error);
  }
};
