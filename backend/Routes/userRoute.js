const express = require('express');
var router = express.Router();
const userController = require('../Controllers/userController')


router.route('/')
.post(userController.addUser)
.get(userController.getUser)


router.route('/login')
.post(userController.Login)
module.exports = router;