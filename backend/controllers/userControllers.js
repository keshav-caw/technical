const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { JWTService } = require('../middlewares/jwtMiddleware');
const jwtService = new JWTService();


const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    // if(user){
    //     res.status(400);
    //     throw new Error("This email already exists");
    // }

    const newUser = await User.create({
        email,password
    });

    await newUser.save();

    const token = jwtService.encode(JSON.stringify(newUser));

    const response = {
        token
    }

    return res.status(201).json(response);
    
})

module.exports = {loginUser};