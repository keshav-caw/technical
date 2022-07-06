const mongoose = require("mongoose")

const pageSchema = mongoose.Schema(
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
        imageId:{
            type:String,
            required:false
        }
    }
)


const Page = mongoose.model('Page',pageSchema);
module.exports = Page;