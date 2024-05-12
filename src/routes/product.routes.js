import express from 'express'
import { addNewProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();


router.route('/').get(getAllProducts)  // user, admin
router.route('/:id').get(getProductById).patch(updateProduct) // admin
router.route('/addNewProduct').post(addNewProduct) // admin

export default router;