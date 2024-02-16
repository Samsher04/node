const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const connect = mongoose.connect(process.env.MONGO_URL);

connect
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(() => {
    console.log("database cannot be connect");
  });
  
module.exports = mongoose;
