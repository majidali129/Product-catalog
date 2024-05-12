import { Review } from "../models/review.model.js";
import { appError } from "../utils/appError.js";
import { appResponse } from "../utils/appResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addNewReview = asyncHandler(async(req, res, next) => {
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user.id;
    const review = await Review.create(req.body);
    if(!review) return next(new appError('Facing issue while posting your review. Try again later.', 400))

    res.json(new appResponse(201, review))
})

const updateReview = asyncHandler (async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!review) return next(new appError('Review not found for that ID', 404))
    res.json(new appResponse(200, review))

})
const getAllReviews = asyncHandler(async(req, res, next) => {
    const reviews = await Review.find();
    res.json(new appResponse(200, reviews, reviews.length))
})


const deleteReview = asyncHandler (async (req, res, next) => {
    const result = await Review.findByIdAndDelete(req.params.id)
    if(!result) return next(new appError('Review not found for that ID', 404))
    res.json(new appResponse(200, null))
})


export {getAllReviews, addNewReview, updateReview, deleteReview}