const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        profileImage:{
            type:String,
            required:false
        },
        isAdmin:{
            type:Boolean,
            default:false,
            required:false
        }
    }
)

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

userSchema.statics.findByCredentials = async(email,username,password) => {
    let user;
    if(email){
        user = await User.findOne({email});
    }else{
        user = await User.findOne({username});
    }
    
    if(!user){
        throw new Error("First register then login");
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        res.status(400);
        throw new Error("Password is wrong!!!")
    }

    return user
}


const User = mongoose.model('User',userSchema);
module.exports = User;