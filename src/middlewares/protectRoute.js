import { User } from "../models/user.model.js";
import { appError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


export const protectRoute = asyncHandler((async( req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token)
        return next(new appError('You are not logged in! please log in to get access', 401))
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id)
    if(!currentUser)
        return next(new appError('User belong to this id no longer exists.', 401))

    if(currentUser.checkForPasswordChangedAfterTokenIssue(decode.iat))
        return next(new appError('User recently changed his password. Please login again', 401))
    req.user = currentUser;
    next()
}));