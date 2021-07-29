import mongoose from 'mongoose';

const {Schema, model} = mongoose

const UsersSchema = new Schema({

        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:false,
            default:"https://m.media-amazon.com/images/G/01/author-pages/no-profile-image-placeholder-gb._CB484118601_.png"
        },
        reviews:{
            type:Schema.Types.ObjectId,
            ref:'Reviews'
        }
    },
    {timestamps:true}
    )


export default model('User', UsersSchema);