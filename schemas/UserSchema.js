/*
    This code will define how NOSQL database should be arranged
    i.e. COLUMNS
*/

const mongoose = require("mongoose"); // singleton

const Schema = mongoose.Schema;

// we are defining user table (collection)
// we are explaining THE COLUMNS (fields)
const UserSchema = new Schema({
    name:{ type:String, default: "Nameless Guy", trim: true },
    username:{ type:String, required: true, trim:true, unique: true},
    email: {type: String, required: true, trim:true, unique: true},
    password:{type:String, required: true},
    profilePicture:{type:String, default: "/images/defaultProfilePicture.png"}
}, { timestamps: true }); 

var User = mongoose.model("User", UserSchema);
// Match the User Schema with database

module.exports = User;