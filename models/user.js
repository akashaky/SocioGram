const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const avatarPath = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
   
}, {
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', avatarPath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()); 
    }
  });

  
//static method
userSchema.statics.uploadedAvatar = multer ( {storage : storage}).single('avatar');
userSchema.statics.avatarPath = avatarPath;


const User = mongoose.model('User', userSchema);

module.exports = User;