import mongoose, {Schema} from "mongoose";
import { Category } from "./category.model.js";
import { appError } from "../utils/appError.js";

const productSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Product name is required'],
        minLength: [5, 'Product name must be equal or grater than 5 characters']
    },
    description: String,
    category: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        default: 0
    },
    stock: {
        default: 0,
        type: Number
    },
    isFeatured: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});


// Responsible to set product id in featuredProducts list for target category
productSchema.pre('save', async function(next) {
    const catName = this.category.charAt(0).toUpperCase() + this.category.slice(1)
    const category = await Category.findOne({name:catName})
    category.noOfItems += 1;
    if(!this.isFeatured) return next()
    if(!category) return next(new appError('Category not found'));
    category.featuredProducts.push(this._id);
    await category.save();
    next()
})

export const Product = mongoose.model('Product', productSchema)