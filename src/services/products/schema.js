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
    imageUrl:{
        type:String, 
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
}, 
    {
        timestamps:true,// Automatically add createdAt and updatedAt fields
    }
)

export default model('Product',productSchema);