const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,'Username is required.'],
        unique: true,
        minlength:[4,'Username must be at least 3 characters long.'],
        maxlength:[20,'Username cannot be more than 20 characters long.']
    },
    email:{
        type: String,
        required: [true,'Email is required.'],
        unique: true,
        validate: {
            validator: (value)=> {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: 'Invalid email address.'
        }
    },
    password:{  
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password must be at least 6 characters long.'],
        maxlength: [20, 'Password cannot be more than 20 characters long.'],
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
});

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('passowrd')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password,salt)

    user.password = hashedPassword;
    next()
})

userSchema.methods.generateAuthToken = function(){
    const user = this;
    const token = jwt.sign({_id:user._id,role:user.role},'secret');
    return token
}

const User = mongoose.model('User',userSchema)
module.exports = User