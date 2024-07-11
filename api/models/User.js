const mongoose = require("mongoose");
const{Schema}  = mongoose
const Userschema= new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

const User = new mongoose.model("User", Userschema);

module.exports = User;
