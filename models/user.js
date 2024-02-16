const mongoose = require("mongoose");
const registerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = register = mongoose.model("register", registerSchema);
