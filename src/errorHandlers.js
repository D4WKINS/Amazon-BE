
export const unauthorized=(err,req,res,next)=>{
    if(err.status === 401){
        res.status(401).send(err.message || "Unauthorized")
    }
    else{
        next(err)
    }
}

export const badRequest = (err,req,res,next)=>{
    if(err.status === 400){
        res.status(400).send(err.message || "Bad Request")
    }else{
        next(err)
    }
}
export const notFound=(err,req,res,next)=>{
    if(err.status === 404){
        res.status(404).send(err.message || "Not found")
    }
    else{
        next(err)
    }
}

export const serverError=(err,req,res,next)=>{
    if(err.status === 500){
        res.status(500).send(err.message || "Server error")
    }
}
