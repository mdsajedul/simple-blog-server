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

module.exports = {
    createBlogPost,updateBlogPost
}