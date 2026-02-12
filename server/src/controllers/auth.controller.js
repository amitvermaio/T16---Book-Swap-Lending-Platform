import { registerUser, loginUser, getMe } from '../services/auth.service.js';
import { welcomeTemplate, otpTemplate } from '../templates/email.template.js';

import sendEmail from '../services/email.service.js';

import debug from 'debug';

const dbgr = debug('dev:auth:controllers');

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const { user, token } = await registerUser({ name, email, password });
    

    res.cookie("BookSwap_Token", token);
    res.status(201).json({ user, token });

    const welcomeHtmlContent = welcomeTemplate({ name: user.name });
    await sendEmail(user.email, "Welcome to Reader Haven", "Welcome to Reader Haven", welcomeHtmlContent);
  } catch (err) {
    dbgr(err); 
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    res.cookie("BookSwap_Token", token);
    res.status(200).json({ user, token });
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

export const forgotpassword = async (req, res, next) => {
  try {
    // Hanji
  } catch (err) {
    next(err);
  }
}
