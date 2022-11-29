const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // userName:String,
//   userName: {
//     type: String,
//     required: true,
//     lowercase: true,
//     trim: true,
//     minLength: 4,
//     maxLength: 30
// },
//   email: {
//     type: String,
//     required: true,
//   },
//   // email:String,
//   password: String,
//   //   userType: String,
//   userType: {
//     type: String,
//     required: true,
//   },
//   // phone:Number,
//   phone: {
//     type: Number,
//     required: true,
//     minLength:10,
//     maxLength: 12
//   },
name:String,
price:Number,
description:String,
password:String,
userType:String
});
module.exports = mongoose.model("User", UserSchema);
