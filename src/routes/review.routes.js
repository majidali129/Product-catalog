import express from 'express'
import { addNewReview, getAllReviews, updateReview, deleteReview } from '../controllers/review.controller.js';

const router = express.Router({mergeParams: true});



router.route('/').get(getAllReviews).post(addNewReview)
router.route('/:id').patch(updateReview).delete(deleteReview)

export default router;