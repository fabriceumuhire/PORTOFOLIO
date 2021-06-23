import bcrypt from 'bcryptjs';
import webtoken from 'jsonwebtoken';
import User from '../models/user.model';
import { registerValidation } from '../validators/user.validator';

export const getUser = async (req, res) => {
  const user = await User.find();
  console.log(user);
  return res.status(200).json(user);
};

export const registerUser = async (req, res) => {
  /* const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  } */
  const hashed = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, hashed);

  try {
    const { email } = req.body.email;
    const emailExist = await User.findOne({ email });
    /* if (emailExist) {
      return res.status(400).json({ error: 'Email exists already' });
    } */
    if (!emailExist) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });
      const savedUser = await User.create();
      console.log(savedUser);
      return res.status(201).json({ message: savedUser });
    }
  } catch (err) {
    return res.json(err);
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
