const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    uname:{
    type:String,
    required:true
    },
    email:{
    type:String,
    lowercase:true,
    required:true
    },  
    password:{
    type:String,
    required:true
    },
    contactno:{
    type:Number
    },
    blogs:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
      }
    ]
})
userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(this.password, salt)
      this.password = hashPassword
      next()
    } catch (err) {
      console.log(err)
    }
  })
  
module.exports = mongoose.model('User',userSchema);
