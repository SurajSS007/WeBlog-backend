const mongoose = require('mongoose');
const User = mongoose.model('User');
const Blog = mongoose.model('Blog');
const cloudinary = require('cloudinary');
require('../Middlewares/cloudinary')

exports.addBlog = async(req,res) => {
    try {

        const { title,image,description,text,likes} = req.body ;
        const fileStr = req.body.image;
        // console.log(fileStr);
        const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
            upload_preset: 'ml_default',
        });
        console.log(uploadResponse);

     
    
        const blog = new Blog();
        blog.title = title
        blog.image = uploadResponse.secure_url
        blog.description = description
        blog.text = text
        blog.likes = likes
        blog.user = req.user

        res.json(blog)
        blog.save(async(err, doc) => {
            if (!err){
                console.log(blog);
                const user =  await User.findById(req.user);
                const b1 =  await Blog.findOne({ title:title});
                user.blogs.push(b1._id);
                user.save()
                res.json({blog,user})
            }
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