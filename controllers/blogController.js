const {Blog,Comment} = require('../model/Blog')


const createBlogPost = async (req,res)=>{
    const {title,content,tags,category} = req.body;

    try {
        const newPost = new Blog({
            title,content,author:req.userId,tags,category
        })
        await newPost.save();
        res.status(201).json({
            success: true, message: 'Blog post created', post: newPost
        })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const updateBlogPost = async (req,res)=>{
    const {title,content,tags,category} = req.body;
    try {
        const updatedPost = await Blog.findOneAndUpdate(
            {_id:req.params.id, author: req.userId},
            {
                $set:{
                    title,content,tags,category
                }
            },
            {new:true}
        );

        if(!updatedPost){
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.json({ success: true, message: 'Blog post updated', post: updatedPost });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const deleteBlogPost = async (req,res)=>{
    try {
        const deletedPost = await Blog.findOneAndDelete({_id:req.params.id, author:req.userId})
        if(!deletedPost){
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.status(200).json({ success: true, message: 'Blog post deleted', post: deletedPost })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const getBlogPostById = async (req,res)=>{
    try {
        const post = await Blog.findById(req.params.id);
        if(!post){
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.status(200).json({success: true, message: 'Blog post', blog: post})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const getAllBlog = async (req,res)=>{
    try {
        const blogs = await Blog.find();
        if(!blogs){
            return res.status(404).json({ success: false, message: 'No blogs found' });
        }
        res.status(200).json({success: true, message: 'All blogs', blogs: blogs})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const createComment = async (req,res)=>{
    try {
        const {content} = req.body;
        const newComment = new Comment({ content,author:req.userId })
        const post = await Blog.findById(req.params.id)
        if(!post){
            return res.status(404).json({ success: false, message: 'Blog post not found'})
        }
        post.comments.push(newComment);

        await post.save()
        res.status(201).json({ success: true, message: 'Comment created', comment: newComment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const updateComment = async (req,res)=>{
    try {
        const {content} = req.body
        const blog = await Blog.findById(req.params.id)
        if(!blog){
            return res.status(404).json({ success: false, message: 'Blog not found'})
        }
        
        const comment = await blog.comments.id(req.params.commentId)
        if(!comment){
            return res.status(404).json({ success: false, message: 'Comment not found'})
        }

        if(comment?.author.toString()!==req.userId){
            return res.status(401).json({ success: false, message: "You are not authorized to update this comment" });
        }

        comment.content = content
        await blog.save()

        res.status(200).json({success: true, message:'Update successfull',comment})

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const deleteCommnet = async (req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        if(!blog){
            return res.status(404).json({ success: false, message: 'Blog not found'})
        }
        const commentIndex = blog.comments.findIndex(comment=>comment.id===req.params.commentId)
        console.log(commentIndex);
        
        if(blog.comments[commentIndex].author.toString()!==req.userId){
            return res.status(401).json({ success: false, message: "You are not authorized to delete this comment" });
        }

        blog.comments.splice(commentIndex,1)

        await blog.save()
        res.json({ success: true, message: 'Comment deleted' });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = {
    createBlogPost,updateBlogPost, deleteBlogPost,getBlogPostById, getAllBlog, createComment, deleteCommnet, updateComment
}