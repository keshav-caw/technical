const mongoose = require("mongoose")

const movieSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required: true
        },
        platform:{
            type:String,
            required: true
        },
        rating:{
            type:Number,
            required: true
        },
        review:{
            type:String,
            required: false
        },
        email:{
            type:String,
            required:true
        }
    }
)


const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;