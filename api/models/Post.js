const mongoose = require("mongoose");
const {Schema} = mongoose;
// const User = require('./User');
const Postschema= new Schema({
   title:String,
   summary:String,
   content:String,
   filepath:String,
   author:{type:Schema.Types.ObjectId,ref:"User" }, },{
   timestamps: true,
});

const Post = new mongoose.model("Post", Postschema);

module.exports = Post;
