import express from "express"
import createError from "http-errors"
import ProductModel from "./schema.js"

const ProductRouter = express.Router();


//Retrive all products
// GET /products

ProductRouter.get("/", async(req, res, next)=>{
    try{

        const products = await ProductModel.find().populate("reviews.User")
        if(products){
            res.send(products)
        }
        else{
            next(createError(404, "No products found"))
        }
     
    }catch(error){
        next (createError(500,"Error occured locating 'products'"))
    }
 
})

//Retrive a specific product
// GET URL = "port/products/:id"
ProductRouter.get("/:productId", async(req, res, next) => {
    try{
        const productId = req.params.productId
        const productFound= await ProductModel.findById(productId)

        if(productFound){
        res.send(productFound)
        }else{ next(createError(404,"Product not found")) }
    }catch(error){
        next(createError(500,"Error occured locating 'product'"))
    }
    
})

//Create a new product
// POST URL = "port/products"
ProductRouter.post("/",async (req, res, next)=>{
    try{
        const newProduct = new ProductModel(req.body)
        const { _id } = await newProduct.save()
        if(newProduct){
            console.log("Product created successfully")
        res.status(201).send({ _id })
       
        }
    }
    catch(error){
        next(createError(500,"Error occured creating 'product'"))
    }

})

//Edit a single specific product
// PUT URL = port/products/:id
ProductRouter.put("/:productId", async(req, res, next)=>{
    try{
        const productId =req.params.productId
        const productEdit = await ProductModel.findByIdAndUpdate(productId)
        res.send(productEdit)
    }catch(error){
        next(createError(500,"Error occured editing 'product'"))
    }

})

//Delete a single specific product
// DELETE URL = port/products/:id
ProductRouter.delete("/:productId", async(req, res, next)=>{
    try{
        const productId = req.params.productId

        const productDeleted = await ProductModel.findByIdAndDelete(productId)

        if(productDeleted){
            res.status(204).send(productDeleted)
        }else{
            next(createError(404,`product with Id ${productId} could not be located`))
        }
    }
    catch(error){
        next(createError(500, "Error occured deleting 'product'"))
    }

})

/*---------------PRODUCT REVIEWS----------*/

ProductRouter.post("/:productId/reviews", async(req, res,next ) =>{
    try{
        const productId = req.params.productId
        const newReview = await ProductModel.findByIdAndUpdate(productId,{
            reviews:{
                user:req.body.user,
                title:req.body.title,
                text:req.body.text
            }
        },{
            new:true,
            runValidators:true
        })

        const addReview = await newReview.save()
        if(addReview){
            res.status(200).send(`Review successfully created on productId ${productId}`)
        }else{
            next(createError(404, `Product with ID${productId} not found`))
        }
    }catch(err){
        next(createError(500,`internal Server error`))
    }

})

export default ProductRouter
