import express from 'express';
import ReviewModel from "./schema.js"

const reviewsRouter = express.Router();

//Retrieve a single review
reviewsRouter.get('/:productId/reviews', (req, res) => {
    try{
    const productId = req.params.productId;
     const getReview = ReviewModel.findOne({productId: productId}); //find the review with the productId
     if(getReview){
         res.status(200).send(getReview);
     }else{
         next(createError(404, 'Review not found'));
     }}
     catch(err){
         next(createError(500, 'Internal server error'));
     }
});

// Create a new review
reviewsRouter.post('/:productId/:userId/reviews', (req, res) => {
    try{
    const productId = req.params.productId
    const userId = req.params.userId
    const newReview = new ReviewModel({   
        productId: productId,
        userId: userId,
        review: req.body,
    })
    const reviewCreated = newReview.save()

    if(reviewCreated){
        next(createError(201, 'Review created'));
    }
}catch(err){
    next(createError(500, 'Internal server error'));
}

});

// Update an existing review
reviewsRouter.put('/', (req, res) => {

});

// Delete an existing review
reviewsRouter.delete('/', (req, res) => {

});