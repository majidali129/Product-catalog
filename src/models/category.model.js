import mongoose, {Schema} from "mongoose"

const categorySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Category name is required']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    noOfItems: Number,
    featuredProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]

},{timestamps: true})


export const Category = mongoose.model('Category', categorySchema)