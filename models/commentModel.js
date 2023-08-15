const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author_anon: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Date, required: true},
    post: {type: Schema.Types.ObjectId, ref: "Post", required: true},
});

module.exports = mongoose.model("Comment", commentSchema);