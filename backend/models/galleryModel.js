const mongoose = require("mongoose")

const gallerySchema = mongoose.Schema(
    {
        title:{
            type:String,
            required: true
        },
        date:{
            type:Date,
            required:true,
            default:Date.now()
        },
        publicId:{
            type:String,
            required:false
        }
    }
)


const Gallery = mongoose.model('Gallery',gallerySchema);
module.exports = Gallery;