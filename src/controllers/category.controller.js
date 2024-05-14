import { Category } from '../models/category.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {appResponse} from '../utils/appResponse.js'
import {appError} from '../utils/appError.js'
import {createOne, deleteOne, getAll, getOne} from './factory.controller.js'


const createNewCategory = createOne(Category)

const getAllCategories = getAll(Category)

const getCategoryById = getOne(Category)

const deleteCategory = deleteOne(Category)

export {createNewCategory, getAllCategories, getCategoryById, deleteCategory}