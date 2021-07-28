import express from 'express';
import multer from 'multer';
import UserModel from './schema.js'
import { cloudinaryStorage } from '../../cloudinary/cloudinary.js';

const UserRouter = express.Router();
    

/**------------ GET ALL USERS   -------------**/

UserRouter.get('/',(req,res,next)=>{
    try{
    const getUsers = UserModel.find()

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
UserRouter.get('/:userId',(req,res,next)=>{
    try{
        const userId = req.params.userId
        const getUser = UserModel.findById(userId)
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
UserRouter.post('/',(req,res,next)=>{
    try{
    const newUser = new UserModel(req.body)
        const createdUser = newUser.save()
        if(createdUser){
            res.status(201).send(`User created`)
        }else{
            next(createError())
        }
    }catch(err){
        next(createError(500,`Internal server error`))
    }



})
/**------------ UPDATE USER PICTURE -------------**/

const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("user")
UserRouter.post("/:userId/picture",uploadOnCloudinary, async (req, res, next) => {
    try {
        const newImage = {image: req.file.path}
        const updatedImage = await ProfileModel.findByIdAndUpdate(req.params.userId, newImage, {
            new: true,
            runValidators: true
        })
        if(updatedImage){
            res.send(updatedImage)
        }else{
            res.send(404).send(`Profile image with the id of ${req.params.userId} not found!`)
        }
        
    } catch (error) {
        next(createError(500, "Error in profileing profile details"))
    }
})

/**------------ EDIT USER -------------**/
UserRouter.put('/:userId',(req,res,next) =>{

        try{
            const userId = req.params.id
            const userModified = UserModel.findByIdAndUpdate(
                userId,
                req.body,
                {new:true},//{new:true} returns the updated document
            )
            if(userModified){
                res.status(200)
            }
        }catch(err){
            next(createError(500,`Internal server error`)) //next passes the error to the error handler
        }
})

/**------------ DELETE USER -------------**/
UserRouter.delete('/:userId',(req,res,next) =>{
            try{
                const userId = req.params.userId
                const deletedUser = UserModel.findByIdAndDelete(userId)
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

