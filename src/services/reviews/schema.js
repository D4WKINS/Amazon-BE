import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewsSchema = new Schema({
    productId: { // for every reveiew there is a productId that is the id of the product that is being reviewed
        type: Schema.Types.ObjectId, // this references the product schema to get the productId 
        required: true,
        ref: 'products'
    },
    userid:{
        type: Schema.Types.ObjectId,
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
    timestamps:true
})

export default model("Reviews", reviewsSchema);