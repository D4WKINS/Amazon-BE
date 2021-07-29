import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewsSchema = new Schema({
    product: { // for every review there is a productId that is the id of the product that is being reviewed
        type: Schema.Types.ObjectId, // this references the product schema to get the productId 
        required: true,
        ref: 'Product'
    },
    user:{
        type: Schema.Types.ObjectId,// For each review there is a userId that is the id of the user that created the review
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
},
    {timestamps:true}
    );

export default model("Reviews", reviewsSchema);