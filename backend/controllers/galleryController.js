const asyncHandler = require('express-async-handler');
const {cloudinary} = require('../config/cloudinary');
const Gallery = require('../models/galleryModel');

const uploadImage = asyncHandler(async(req,res)=>{
    try {
        const fileStr = req.body.data;
        const title = req.body.title;
        const uploadResponse = await cloudinary.uploader.upload(fileStr,{
            upload_preset:'dev_setups',
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        const image = await Gallery.create({
            title:title,
            publicId: uploadResponse.public_id
        })
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        console.log(error);
        res.status(500)
        throw new Error("File seems to be corrupted!Please try again");
    }
})

const deleteImageById = asyncHandler(async(req,res)=>{
    const {_id} = req.body;
    const image = await Gallery.findById(_id);
    if(!image){
        throw new Error("Image doesn't exist!");
    }
    const result = await Gallery.findByIdAndDelete(_id);
    res.status(201).json(result);
})

const deleteImageByPublicId = asyncHandler(async(req,res)=>{
    const {publicId} = req.body;
    const image = await Gallery.findById(publicId);
    if(!image){
        throw new Error("Image doesn't exist!");
    }
    const result  = await Gallery.deleteMany({publicId});
    res.status(201).json(result);
})

const getImageById = asyncHandler(async(req,res)=>{
    const {_id} = req.body;
    const image = await Gallery.findOne({_id});
    if(!image){
        throw new Error("Image doesn't exist!");
    }
    res.status(200).json(image);
})

const getImageByPublicId = asyncHandler(async(req,res)=>{
    const {publicId} = req.body;
    const image = await Gallery.findOne({publicId});
    if(!image){
        throw new Error("Image doesn't exist!");
    }
    res.status(200).json(image);
})

const getImages = asyncHandler(async(req,res)=>{
    const images = await Gallery.find();
    res.status(200).json(images);
})



module.exports = {uploadImage,getImageById,getImageByPublicId,deleteImageById,deleteImageByPublicId,getImages};