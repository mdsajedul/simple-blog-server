const {createBlogPost,updateBlogPost} = require('../controllers/blogController')
const router = require('express').Router()
const userAuthorizationCheck = require('../middlewares/userAuthorizationCheck')

router.post('/blogs',userAuthorizationCheck,createBlogPost)
router.patch('/blogs/:id',userAuthorizationCheck,updateBlogPost)

module.exports = router
