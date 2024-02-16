const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register"
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
