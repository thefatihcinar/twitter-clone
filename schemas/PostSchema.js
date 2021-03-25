/*
    This code will define how NOSQL database should be arranged
    i.e. COLUMNS
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// We are defining posts table (collection)
// we are explaining THE COLUMNS (fields)
const PostSchema = new Schema({
    content: {type : String, trim: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "User"},
    pinned: Boolean
}, { timestamps: true});

let Post = mongoose.model("Post", PostSchema);

module.exports = Post;