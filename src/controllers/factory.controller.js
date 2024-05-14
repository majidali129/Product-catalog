import { apiFeatures } from "../utils/apiFeatures.js";
import { appError } from "../utils/appError.js";
import { appResponse } from "../utils/appResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOne = Model => asyncHandler(async(req,res, next) => {
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user.id;
    const doc = await Model.create(req.body)
    if(!doc) return next(new appError('Something went wrong while adding new document. Try again later.', 400));

    res.json(new appResponse(201, doc))
})

const getAll = Model => asyncHandler(async (req, res, next) => {
    const features = new apiFeatures(Model.find(), req.query);
    features.filter().sort().fields().pagenate()
    const docs = await features.query;

    res.json(new appResponse(200, docs,docs.length))
});


const getOne = (Model) => asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id)
    if(!doc)  return next(new appError('Document not found for that ID', 404))
    res.json(new appResponse(200, doc))
})

const updateOne = (Model) => asyncHandler (async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!doc) return next(new appError('Document not found for that ID.', 404))
    res.json(new appResponse(200, doc))
})

const deleteOne = (Model) => asyncHandler (async (req, res, next) => {
    const result = await Model.findByIdAndDelete(req.params.id)
    if(!result) return next(new appError('Document not found for that iD', 404))
    res.json(new appResponse(200, null))
})


export {getAll, getOne, updateOne,deleteOne, createOne}