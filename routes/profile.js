const {createProfile, updateProfile} = require('../controllers/profile/profileController')
const router = require('express').Router()
const userAuthorizationCheck = require('../middlewares/userAuthorizationCheck')

router.post('/profile',userAuthorizationCheck,createProfile)
router.patch('/profile',userAuthorizationCheck,updateProfile)

module.exports = router
