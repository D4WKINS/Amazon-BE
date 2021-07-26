import mongoose from 'mongoose';

const {Schema, model} = mongoose //import Schema and model from mongoose

const productSchema = new Schema({//create a schema
    //Built in schema validation 
    //e.g 
    //name{
    //   type:String,
    //   required:true
    //}

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
        required:true,
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
    reviews:{
        type:Schema.Types.ObjectId,
        ref:'Reviews'
    },
}, 
    {
        timestamps:true,// Automatically add createdAt and updatedAt fields
    }
)

export default model('Product',productSchema);