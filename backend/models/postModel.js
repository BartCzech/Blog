const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Date},
    author: {type: Schema.Types.ObjectId, ref: "User"},
});

module.exports = mongoose.model("Post", postSchema);