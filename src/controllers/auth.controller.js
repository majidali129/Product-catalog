import jwt from 'jsonwebtoken'

import { User } from "../models/user.model.js";
import { appError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { appResponse } from '../utils/appResponse.js';

const assignToken = async (id) => await jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

const registerUser = asyncHandler(async(req, res, next) => {
    const {email, password, confirmPassword, name} = req.body;
    if([email, password, name, confirmPassword].some(field => field?.trim() === '')){
        return next(new appError(`${field} is required.`, 400))
    };
    const existingUser = await User.findOne({email})
    if(existingUser) return next(new appError(`Already user exist with this ${email}`, 400));
    const user = await User.create(req.body)
    user.password = undefined;
    const token = await assignToken(user._id)
    console.log(token)
    res.status(200).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
})

export {registerUser}