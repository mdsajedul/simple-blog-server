const Profile = require('../../model/Profile')

const createProfile = async (req,res)=>{
    const {firstName,lastName, bio, profileImage,website,location,dateOfBirth,facebook,twitter,instagram,linkedin } = req.body;
    // console.log(userId);
    try {
        const newProfile = new Profile({
            userId: req.userId,
            firstName,
            lastName,
            bio,
            profileImage,
            website,
            location,
            dateOfBirth,
            social:{
                facebook,
                twitter,
                instagram,
                linkedin
            }
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

const updateProfile = async (req,res)=>{
    const {firstName, lastName, bio, profileImage, website, location, dateOfBirth, facebook, twitter, instagram, linkedin} = req.body;
    try {
        const updatedProfile = await Profile.findOneAndUpdate({userId:req.userId},{
            $set: {
                firstName,
                lastName,
                bio,
                profileImage,
                website,
                location,
                dateOfBirth,
                social:{
                    facebook,
                    twitter,
                    instagram,
                    linkedin
                }
            }
        },{new:true}
        );
        res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            profile: updatedProfile
        })
    } 
    catch (error) {
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

module.exports = {
    createProfile, updateProfile
}