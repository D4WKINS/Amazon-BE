import mongoose from 'mongoose';

const {Schema, model} = mongoose //import Schema and model from mongoose

const productSchema = new Schema({//create a schema
    //Built in schema validation

    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:false,
        default: 'http://www.jennbennett.net/wp-content/uploads/2010/11/amazon-no-image.jpg'
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    reviews: {//For every product we want to create a review schema to store the reviews for that product
    type: Schema.Types.ObjectId, 
        ref: 'Review', //this is a reference to the review schema to create a review for this product
        required: false 
    },
    tags: {//For every product we want to create a tag schema to store the tags for that product
        type: [String],//[String] means array of strings which means an array that expects string values
        required: false
    },
},
    {timestamps:true}// Automatically add createdAt and updatedAt fields
);

export default model('Product',productSchema);