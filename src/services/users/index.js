import express from 'express';
import multer from 'multer';
import UserModel from './schema.js'
import createError from 'http-errors';
import { cloudinaryStorage } from '../../cloudinary/cloudinary.js';


const UserRouter = express.Router();
    

/**------------ GET ALL USERS   -------------**/

UserRouter.get('/', async(req,res,next)=>{
    try{
    const getUsers = await UserModel.find()
    if(getUsers){
        res.status(200).send(getUsers)
    }else{
        next(createError(401,`Users not found`))
    }
}
    catch(err){
            next(createError(500,`Internal server error`))
    }

})


/**------------ GET SINGLE USER  -------------**/
UserRouter.get('/:userId',async(req,res,next)=>{
    try{
        const userId = req.params.userId
        const getUser = await UserModel.findById(userId)
        if(getUser){
            res.status(200).send(getUser)
        }else{
            next(createError(401,`User not found`))
        }
    }catch(err){
        next(createError(500,`Internal server error`))
    }
})

/**------------ CREATE NEW USER -------------**/
UserRouter.post('/',async (req,res,next)=>{
    try{
        const newUser =  new UserModel(req.body)
        const {_id} = await newUser.save() // {_id} means we are getting the id of the document that we have just created with the newUser object
        if(newUser){
            console.log(`New user created with id: ${_id}`)
            res.status(201).send({_id})
        }else{
            next(createError(401,`User not created`))
        }
    }catch(err){
        next(createError(500,`Internal server error`))
    }



})
/**------------ UPDATE USER PICTURE -------------**/

// UploadOnCloudinary allows us to upload the image to cloudinary using the cloudinaryStorage function from cloudinary.js
//multer({ storage: cloudinaryStorage}) means that we are going to upload images to cloudinary storage
//single("image") is the key for multer, it is used to know which file is going to be uploaded, this can be any string/name
const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("picture") //.sinlge("image") means that we are only going to upload one image

UserRouter.post("/:userId/image",uploadOnCloudinary, async (req, res, next) => {
    try {
        const newImage = {image: req.file.path}//{image: req.file.path} means that we are going to upload the image to the image field of a user document
                                                                                              //findByIdAndUpdate is a mongoose function that allows us to update a document                                                        
        const updatedImage = await UserModel.findByIdAndUpdate(req.params.userId, newImage, { //First parameter is the id of the document we want to update, second parameter is the object with the new values             
            new: true,// returns the document with the new values
            runValidators: true// run the validators
        })
        //confirm that the image was updated
        if(updatedImage){
            res.status(200).send(updatedImage)
        }else{
            res.status(404).send(`Profile image with the id of ${req.params.userId} not found!`)
        }
        
    } catch (error) {
        next(createError(500, "Error occurred updating user picture"))
    }
})

/**------------ EDIT USER -------------**/
UserRouter.put('/:userId', async(req,res,next) =>{

        try{
            const userId = req.params.userId
            const userModified = await UserModel.findByIdAndUpdate(userId, req.body,{
                new:true,
                runValidators: true
            })

            if(userModified){
                res.status(200).send("User modified successfully")
            }else{
                next(createError(401,`User not found`))
            }
         }catch(err){
            next(createError(500,`Internal server error`)) //next passes the error to the error handler
        }
})

/**------------ DELETE USER -------------**/
UserRouter.delete('/:userId', async(req,res,next) =>{
            try{
                const userId = req.params.userId
                const deletedUser = await UserModel.findByIdAndDelete(userId)
                    if(deletedUser){
                        res.status(200).send(`User was deleted successfully`)
                    }else{
                        next(createError(404,`User not found`))
                    }
            }catch(err){
                next(createError(500, `Internal server errors`))
            }
})

export default UserRouter;

