const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const User = require('../models/userModel');
const { JWTService } = require('../middlewares/jwtMiddleware');
const jwtService = new JWTService();


const registerUser = asyncHandler(async (req,res)=>{
    const {email,name,username,password,confirmPassword} = req.body;

    const user = await User.findOne({email});

    if(user){
        throw new Error("This email already exists");
    }

    if(password!==confirmPassword){
        throw new Error("Password should match with confirm password");
    }

    const newUser = await User.create({
        name,email,password,username
    });

    await newUser.save();

    const token = jwtService.encode(JSON.stringify(newUser));

    const response = {
        email,username,token
    }

    return res.status(201).json(response);
    
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password,username} = req.body;

    const user = await User.findByCredentials(email,username,password);

    const token = jwtService.encode(JSON.stringify(user));

    const response = {
        email,username,token
    }

    return res.status(200).json(response);
})

const updateProfile = asyncHandler(async(req,res)=>{
    const {email,password,name,username} = req.body;
    const user = await User.findById(req.user._id);
    if(email){
        const userEmail = await User.find({email});
        if(userEmail.length>0){
            throw new Error("This email already exists");
        }
        user.email = email;
    }
    if(password){
        user.password = password;
    }
    if(name){
        user.name = name;
    }
    if(username){
        const userUsername = await User.find({username});
        if(userUsername){
            throw new Error("This username already exists");
        }
        user.username = username;
    }

    await user.save();

    const token = jwtService.encode(JSON.stringify(user));

    const response = {
        email,username,token
    }

    return res.status(201).json(response);
})

const deleteProfile = asyncHandler(async(req,res)=>{
    const result = await User.findByIdAndDelete(req.user._id);
    res.status(201).json(result);
})



module.exports = {registerUser,loginUser,updateProfile,deleteProfile};