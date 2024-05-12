import { Product } from '../models/product.model.js'
import { appError } from '../utils/appError.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import { appResponse } from '../utils/appResponse.js';


const addNewProduct = asyncHandler(async(req,res, next) => {
    const products = await Product.create(req.body)
    if(!products) return next(new appError('Something went wrong while adding new product. Try again later.', 400));

    res.json(new appResponse(201, products))
})

const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find();

    res.json(new appResponse(200, products,products.length))
});

const getProductById = asyncHandler (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log(req.params)

    if(!product) return next(new appError('Product not found for that ID.', 404))

    res.json(new appResponse(200, product))
})


const updateProduct = asyncHandler (async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!product) return next(new appError('Product not found for that ID.', 404))

    res.json(new appResponse(200, product))
})

const deleteProduct = asyncHandler (async (req, res, next) => {
    const result = await Product.findByIdAndDelete(req.params.id)
    if(!result) return next(new appError('Product not found for that iD', 404))

    res.json(new appResponse(200, null))
})

export {getAllProducts, addNewProduct, getProductById, updateProduct, deleteProduct}
