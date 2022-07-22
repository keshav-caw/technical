const asyncHandler = require('express-async-handler');
const Movie = require('../models/movieModel');

const getMovies = asyncHandler(async(req,res)=>{
    const email = req.user.email;

    const movies = await Movie.find({email});

    res.status(200).json(movies);
})

const createMovie = asyncHandler(async (req,res)=>{
    const {title,platform,rating,review} = req.body;
    const email = req.user.email;

    const movie = await Movie.findOne({title});

    if(movie){
        res.status(400);
        throw new Error("This movie already exists");
    }

    const newMovie = await Movie.create({
        title,platform,rating,review,email
    });

    await newMovie.save();

    return res.status(201).json(newMovie);
})

const editMovie = asyncHandler(async(req,res)=>{
    const {id,title,platform,rating,review} = req.body;

    const movie = await Movie.findById(id);

    if(!movie){
        res.status(400);
        throw new Error("No such movie exists");
    }

    movie.title = title;
    movie.platform = platform;
    movie.rating = rating;
    movie.review = review;

    await movie.save();

    return res.status(201).json(movie);
})

const deleteMovie = asyncHandler(async(req,res)=>{
    const {id} = req.body;

    const movie = await Movie.findByIdAndDelete(id);

    return res.status(201).json(movie);
})

module.exports = {getMovies,createMovie,editMovie,deleteMovie};