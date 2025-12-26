import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });

  if (existing) throw new AppError('Email already registered', 400);

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash: hash,
  });

  const token = signToken(user);

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError('"Invalid email or password"', 401);

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError('Invalid credentials', 401);

  const token = signToken(user);
  return { user, token };
};

export const getMe = async (userId) => {
  return User.findById(userId).select('-passwordHash');
};
