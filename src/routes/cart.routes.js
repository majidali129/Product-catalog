
import express from 'express'
import { addItemToCart, clearCart, getUserCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router({mergeParams: true});


router.use(protectRoute)

router.route('/').get(getUserCart).post(protectRoute, addItemToCart)
router.route('/clear').delete(clearCart)
// router.route('/addItemToCart').post(protectRoute, addItemToCart)

export default router