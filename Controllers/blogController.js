const mongoose = require('mongoose');
const User = mongoose.model('User');
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
        blog.user = req.user

        res.json(blog)
        blog.save(async(err, doc) => {
            if (!err){
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


exports.getBlogByID =  async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id);
        res.json(blog);
    } catch (err) {
        console.log(error);
    }

}
