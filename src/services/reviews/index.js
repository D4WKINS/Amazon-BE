import express from 'express';
import ReviewModel from "./schema.js"
import createError from 'http-errors';
const ReviewRouter = express.Router();

ReviewRouter.get('/', async(req, res, next) => {
    try{
     const getReviews = await ReviewModel.find().populate("user","product"); // this populates the reviews with the user and product ids
     if(getReviews){
         res.status(200).send(getReviews);
     }else{
         next(createError(404, 'Reviews not found'));
     }}
     catch(err){
         next(createError(500, 'Internal server error'));
     }
});

//Retrieve a single review
ReviewRouter.get('/:productId', async (req, res, next) => {
    try{
    const productId = req.params.productId;
     const getReview = await ReviewModel.findById(productId).populate("user","product"); //find the review with the productId
     if(getReview){
         res.status(200).send(getReview);
     }else{
         next(createError(404, 'Review not found'));
     }
    }
     catch(err){
         next(createError(500, 'Internal server error'));
     }
});

// Create a new review
ReviewRouter.post('/', async (req, res, next) => {
    try{


    const newReview = new ReviewModel(req.body);
    const { _id } = await newReview.save()
    if(newReview){
        res.status(201).send( { _id });
    
    }else{
        next(createError(500, 'Internal server error'));
    }
}catch(err){
    next(createError(500, 'Internal server error'));
}

});

// Update an existing review
ReviewRouter.put('/:productId', async(req, res, next) => {
    try{
    const productId = req.params.productId;
    const updateReview = await ReviewModel.findByIdAndUpdate(productId, req.body, {new: true});
    if (updateReview) {
        res.status(200).send(updateReview);
    }else{
        next(createError(404, 'Review not found'));
    }
}   catch(err){
        next(createError(500,'Internal server error'))
    }
});

// Delete an existing review
ReviewRouter.delete('/:productId', async(req, res, next) => {
    try{
    const productId = req.params.productId
    const deleteReview = await ReviewModel.findByIdAndDelete(productId)
    if(deleteReview){
        res.status(200).send("Review Deleted")
    }else{
       next(createError(401,`Cannot find review with an id of ${productId}`))
    }
    }catch(err){
        next(createError(500,'Internal server error'))
    }

});

export default ReviewRouter;