import { registerUser, loginUser, getMe } from '../services/auth.service.js';
import AppError from '../utils/AppError.js';
import debug from 'debug';

const dbgr = debug('dev:auth:controllers');

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('All fields are required', 400));
    }
    
    const { user, token } = await registerUser({ name, email, password });

    res.status(201).json({ user, token });
  } catch (err) {
    dbgr(err); 
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    res.json({ user, token });
  } catch (err) {
    dbgr(err); 
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await getMe(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
