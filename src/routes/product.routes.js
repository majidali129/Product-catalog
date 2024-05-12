import express from 'express'

import { addNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import reviewRouter from './review.routes.js'

const router = express.Router();

router.use('/:productId/reviews', reviewRouter)

router.route('/').get(getAllProducts)  // user, admin
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct) // admin
router.route('/addNewProduct').post(addNewProduct) // admin

export default router;