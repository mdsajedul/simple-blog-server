const {createProfile} = require('../controllers/profile/profileController')
const router = require('express').Router()
const userAuthorizationCheck = require('../middlewares/userAuthorizationCheck')

router.post('/profile',userAuthorizationCheck,createProfile)

module.exports = router
