const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Register =new Schema ({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("User",Register);