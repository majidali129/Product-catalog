import { Category } from '../models/category.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {appResponse} from '../utils/appResponse.js'
import {appError} from '../utils/appError.js'


const createNewCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.insertMany(req.body)
    if(!category) return next(new appError('Filled to add new category. Try again later', 500))

    res.json(new appResponse(201, category))
})

const getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();

    res.json(new appResponse(200, categories, categories.length))
})

const getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).populate('featuredProducts');

    res.json(new appResponse('200',category))
})

export {createNewCategory, getAllCategories, getCategoryById}