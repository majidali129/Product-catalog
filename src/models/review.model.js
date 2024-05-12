import mongoose, {Schema} from "mongoose";

const reviewSchema = Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
}, {timestamps: true})



export const Review = mongoose.model('Review', reviewSchema)