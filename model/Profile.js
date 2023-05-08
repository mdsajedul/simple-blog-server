const mongoose = require('mongoose');
const path = require('path')

const profileSchema = mongoose.Schema({
    userId:{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
        default: path.join(__dirname,'../uploads/images/profile-images/default.png')
    },
    bio: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
      },
      location: {
        type: String,
        trim: true
      },
      dateOfBirth: {
        type: Date
      },
      social: {
        facebook: {
          type: String,
          trim: true
        },
        twitter: {
          type: String,
          trim: true
        },
        instagram: {
          type: String,
          trim: true
        },
        linkedin: {
          type: String,
          trim: true
        }
      }
    },{timestamps: true}

)

const Profile = mongoose.model('Profile',profileSchema)
module.exports = Profile