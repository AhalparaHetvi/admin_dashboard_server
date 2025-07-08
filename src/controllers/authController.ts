import { Request, Response } from 'express';
import User from '../models/User.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ status: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.json({ message: 'User registered successfully', user: newUser, status: true });
  } catch (err) {
    res.json({ status: false, message: 'Something went wrong', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ status: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ status: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({ status: true, token, user });
  } catch (err) {
    res.json({ status: false, message: 'Something went wrong', error: err });
  }

};
