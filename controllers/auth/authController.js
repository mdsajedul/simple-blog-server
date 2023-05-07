const User = require('../../model/User')
const bcrypt = require('bcryptjs')

const register = async (req,res)=>{
    const {username, email, password} = req.body

    try{
        const user = new User({username,email,password})
        await user.save()
        const token = user.generateAuthToken();

        res.status(201).json({
            user,token
        })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = User.findOne({email});
        if(!user){
            throw new Error('Invalid email or password.')
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error('Invalid email or password.');
        }

        const token = user.generateAuthToken()

        res.status(200).json({ user, token });

    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register,login
}