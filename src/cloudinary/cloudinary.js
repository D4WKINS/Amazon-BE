import { v2 as cloudinary } from "cloudinary"; // cloudinary is the alias of v2
//What dose v2 do? v2 is a function, which is the cloudinary function. and cloudinary is the global object.
//cloudinary allows you to use cloudinary api in a synchronous way.

import { CloudinaryStorage } from "multer-storage-cloudinary"; 
// multer-storage-cloudinary is a storage plugin for multer which uses cloudinary as its storage provider.

// This creates an instance of multer with the storage plugin.
export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary:cloudinary,// the value cloudinary is a reference to our cloudinary storage
    params:{// params are the parameters that will be passed to the cloudinary api
      folder:"amazon" // folder is the folder name in cloudinary
    }
  })