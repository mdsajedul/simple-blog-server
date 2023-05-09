const Profile = require('../model/Profile');
const User = require('../model/User')

const getAllUser =async (_req,res)=>{
   try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({success:false, message:'No user found'})
        }
        res.status(200).json({success:true,message:'Users found',users:users})
   } catch (error) {
        res.status(400).json({ success: false, error: error.message });
   }
}

const getUserById = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }
        const profile = await Profile.findOne({userId:req.params.id})

        res.status(200).json({success:true,message:'User found',user:{user,profile:profile? profile : null}})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = {
    getAllUser, getUserById
}