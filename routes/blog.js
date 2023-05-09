const {createBlogPost,updateBlogPost, deleteBlogPost, getAllBlog,getBlogPostById, createComment, updateComment, deleteCommnet,} = require('../controllers/blogController')
const router = require('express').Router()
const userAuthorizationCheck = require('../middlewares/userAuthorizationCheck')

router.post('/blogs',userAuthorizationCheck,createBlogPost)
router.get('/blogs',getAllBlog)
router.patch('/blogs/:id',userAuthorizationCheck,updateBlogPost)
router.get('/blogs/:id',getBlogPostById)
router.delete('/blogs/:id',userAuthorizationCheck,deleteBlogPost)

router.post('/blogs/:id/comments',userAuthorizationCheck,createComment)
router.patch('/blogs/:id/comments/:commentId',userAuthorizationCheck,updateComment)
router.delete('/blogs/:id/comments/:commentId',userAuthorizationCheck,deleteCommnet)

module.exports = router
