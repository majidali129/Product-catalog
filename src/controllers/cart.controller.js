import { Cart } from '../models/cart.model.js'
import { Product } from '../models/product.model.js';
import { appError } from '../utils/appError.js';
import { appResponse } from '../utils/appResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'


export const getCart = async (userId) => {
    const cartAggregation = await Cart.aggregate([
      {
        $match: {
          owner: userId,
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          // _id: 0,
          product: { $first: "$product" },
          quantity: "$items.quantity"
        },
      },
      {
        $group: {
          _id: "$_id",
          items: {
            $push: "$$ROOT",
          }, // get first value of coupon after grouping
          cartTotal: {
            $sum: {
              $multiply: ["$product.price", "$quantity"], // calculate the cart total based on product price * total quantity
            },
          },
        },
      },
    ]);

    const cartAggregation2 = await Cart.aggregate([
        {
            $match: {owner: userId}
        },
        {
            $unwind:'$items'
        },
        {
            $lookup: {
                from: 'products',
                'localField': 'items.product',
                'foreignField': '_id',
                as: 'product'
            }
        },
        {
            $project: {
                product: {$first: '$product'},
                quantity: '$items.quantity'
            }
        },
        {
            $group: {
                _id: '$_id',
                items: {
                    $push: '$$ROOT'
                },
                cartTotal: {
                    $sum: {
                        $multiply: ['$product.price', '$quantity']
                    }
                }
            }
        }
    ])

    return (
      cartAggregation2[0] ?? {
        _id: null,
        items: [],
        cartTotal: 0
      }
    );
  };

const addItemToCart = asyncHandler(async (req, res, next) => {
    const owner = req.user._id;
    const {quantity} = req.body;
    const productId = req.params.productId
    // find cart for current user
    let cart = await Cart.findOne({owner});
    if(!cart){
        const newCart = new Cart({owner})
        await newCart.save()
        cart = newCart
    }
    // check if product the user adding existing in DB
    const product = await Product.findById(productId);
    if(!product) return next(new appError('Product not longer exists', 404));
    // check for quantity if is less than the stock.
    if(quantity > product.stock) return next(new appError(product.stock > 0?  `Only ${product.stock} products are remaining. But you adding ${quantity}`: 'Product is out of stock',400));
    // now check if product already is in cart;
    const addedProduct = cart.items.find(el => el.product.toString() === productId)
    if(addedProduct){
        addedProduct.quantity = quantity;
    }else{
        cart.items.unshift({
            product: productId,
            quantity
        })
    }
    await cart.save({validateBeforeSave: true});
    const newCart = await getCart(owner)
    console.log(newCart)

    res.json(new appResponse(200, {cart, cartStats: newCart}, cart.length))
})


const getUserCart = asyncHandler(async (req, res, next) => {
    const cart = await getCart(req.user._id)

    res.json(new appResponse(200, cart, ))
})

const clearCart = asyncHandler(async (req, res, next) => {
    await Cart.findOneAndUpdate({id:req.user._id},
        {
            $set: {
            items: []
            },
        },
        { new: true }
        );
    const cart = await getCart(req.user._id);

    res.json(new appResponse(200, cart))
});

export {addItemToCart, clearCart, getUserCart}