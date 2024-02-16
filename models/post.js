const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'register', 
        required: true
    },
    likes: {
        type: Number,
        default: 0 // Default value for likes is 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema); 
