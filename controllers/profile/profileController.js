const Profile = require('../../model/Profile')

const createProfile = async (req,res)=>{
    const {firstName,lastName, bio, profileImage } = req.body;
    // console.log(userId);
    try {
        const newProfile = new Profile({
            userId: req.userId,
            firstName,
            lastName,
            bio,
            profileImage
        });

        await newProfile.save();

        res.status(201).json({
            success: true,
            message:'Profile created successfully',
            profile: newProfile
        })

    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

// const updateUserProfile = async (req,res)=>{
//     const userId = req.userId;
//     const {}
// }

module.exports = {
    createProfile
}