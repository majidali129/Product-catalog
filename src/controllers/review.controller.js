import { Review } from "../models/review.model.js";
import { createOne, deleteOne, getAll, updateOne } from "./factory.controller.js";

const addNewReview = createOne(Review)
const updateReview = updateOne(Review)
const getAllReviews = getAll(Review)
const deleteReview = deleteOne(Review)


export {getAllReviews, addNewReview, updateReview, deleteReview}