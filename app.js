const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = require("./route/route");
const mongoose = require("./dbConnections");
const hbs = require("hbs");
const path = require("path");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passport2 = require("./password/password");
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const app = express();

const port = process.env.PORT || 5000;

app.use(
  session({
    secret: "your_secret_bhhs_jnjs",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.set("view engine", "hbs");

app.listen(port, (err) => {
  if (!err) console.log(`Server is running on ${port}`);
  else console.log(err);
});

app.use(router);
