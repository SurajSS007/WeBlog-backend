const express = require('express');
var router = express.Router();
const blogController = require('../Controllers/blogController')
const { verifyAccessToken } = require('../Middlewares/jwt_helper')

router.route('/')
.get(blogController.getBlog)    
.post(blogController.addBlog)

module.exports = router;