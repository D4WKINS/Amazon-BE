import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import productRoutes from './services/products/index.js'
import {unauthorized,notFound,badRequest,serverError} from './errorHandlers.js'
import cors from 'cors'

const port = process.env.PORT || 3001
const server = express()

server.use(express.json())

server.use(cors())//Allows Cross Origin Resource Sharing

//----- ROUTES ---------------------
server.use('/products',productRoutes)

//----- ERROR HANDLERS--------------
server.use(unauthorized)
server.use(notFound)
server.use(badRequest)
server.use(serverError)

//----------------------------------------------------


console.table(listEndpoints(server))
//----------------------------------------------------
mongoose.connect(process.env.MONGO_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false})
.then(() =>
  console.log('Connected to MongoDB'),
    server.listen(port, ()=>{
        try{
        console.log(`Server is running on ${port}`)
        }catch(e){
            console.error(`Something went wrong ${e}`)
        }

    })
)

// Connects to MongoDB  ---> using our mongoDB Connection string which is stored in our environment variabled dotenv congifuration file
           
//These are the credentials for our MongoDB database AKA options
// { useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false}

//--------------------------------------------------------------------------

// useNewUrlParser: true
// Used to parse MongoDB connection strings

//---------------------------------------------

// useUnifiedTopology: true
// simply sets up a connection string and begins doing operations.
// Each operation then fails or succeeds depending on whether the driver
// can reach a server at the time that operation is executed

//---------------------------------------------

// useFindAndModify: true by default. 
// When Set to false it makes findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
// and if you see the definition file of mongoose, where mentioned that it calls findAndModify update command.
