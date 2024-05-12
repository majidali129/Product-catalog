import express from 'express'
import { createNewCategory, getAllCategories, getCategoryById } from '../controllers/category.controller.js';

const router = express.Router();


router.route('/').get(getAllCategories)
router.route('/addNewCategory').post(createNewCategory)
router.route('/:id').get(getCategoryById)

export default router;