import express from 'express';
import ReviewModel from "./schema.js"

const ReviewRouter = express.Router();

//Retrieve a single review
ReviewRouter.get('/:productId/reviews', (req, res) => {
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
ReviewRouter.post('/:productId/:userId/reviews', (req, res) => {
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
ReviewRouter.put('/', (req, res) => {

});

// Delete an existing review
ReviewRouter.delete('/', (req, res) => {

});

export default ReviewRouter;