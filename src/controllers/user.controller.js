import { User } from "../models/user.model.js";
import { appError } from "../utils/appError.js";
import { appResponse } from "../utils/appResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAll, getOne, updateOne, deleteOne } from "./factory.controller.js";


const getAllUsers = getAll(User)
const getUser = getOne(User)
const updateUser = updateOne(User)
const deleteUser = deleteOne(User)

const getMe = (req, _, next) => {
    req.params.id = req.user.id;
    next()
}

const filterBody = (obj, ...fields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(fields.includes(el)) newObj[el] = obj[el]
    })
    return newObj;
}

const updateMe = asyncHandler(async(req, res, next) => {
    if(req.body.password || req.body.confirmPassword)
        return next(new appError('This route is not for password updates. Please use /updatePassword'))
    const filteredBody = filterBody(req.body, 'name', 'email')
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidator: true
    })
    res.json(new appResponse(200, {user: updatedUser}))
})

export {getAllUsers, getUser, getMe, updateUser, updateMe, deleteUser}