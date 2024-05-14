import jwt from 'jsonwebtoken';

import { User } from '../models/user.model.js';
import { appError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const assignToken = async (id) =>
  await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const registerUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return next(new appError(`Already user exist with this ${email}`, 400));
  const user = await User.create(req.body);
  user.password = undefined;
  const token = await assignToken(user._id);
  console.log(token);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email || password))
    return next(new appError('Please provide email and password', 400));
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new appError('User not found', 404));
  if (!user.isPasswordCorrect(password, user.password))
    return next(new appError('Invalid email or password', 400));
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token: await assignToken(user._id),
    data: {
      user
    }
  });
});

export { registerUser, login };
