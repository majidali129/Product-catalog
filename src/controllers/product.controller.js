import { Product } from '../models/product.model.js'
import { createOne, deleteOne, getAll, getOne, updateOne } from './factory.controller.js';


const addNewProduct = createOne(Product)
const getAllProducts = getAll(Product)
const getProductById = getOne(Product)
const updateProduct = updateOne(Product)
const deleteProduct = deleteOne(Product)

export {getAllProducts, addNewProduct, getProductById, updateProduct, deleteProduct}
