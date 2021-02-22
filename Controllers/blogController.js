const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');


exports.addBlog = async(req,res) => {
    try {
        const { title,image,description,text,likes} = req.body ;
    
        const blog = new Blog();
        blog.title = title
        blog.image = image
        blog.description = description
        blog.text = text
        blog.likes = likes
        blog.save((err, doc) => {
            if (!err)
                res.json(blog)
            else {
                    console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
    } 
}

exports.getBlog =  async (req, res) => {
    try {
        const blog = await Blog.find();
        res.json(blog);
    } catch (err) {
        console.log(error);
    }
}