const express = require("express");
const router = express.Router();
const register = require("../models/user");
const newdata = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const upload = require("./multer");
const newpost = require("../models/post");
const Comment = require("../models/comment");

router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
      try {
          const posts = await newpost.find().populate("userId").exec();
          const postsWithComments = await Promise.all(posts.map(async (post) => {
              const comments = await Comment.find({ postId: post._id }).populate("userId").exec();
              return { ...post.toObject(), comments };
          }));

          res.render("index", { posts: postsWithComments, userName: req.user });
      } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).send("Internal Server Error");
      }
  } else {
      res.redirect("/login");
  }
});

router.get("/allpost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await newpost.findById(postId).populate("userId").exec();
    const comments = await Comment.find({ postId }).populate("userId").exec();
    res.render("allpost", { post, comments });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/post", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("post");
  } else {
    return res.redirect("/login");
  }
});

router.get("/profile", async(req, res) => {
  if (req.isAuthenticated()) {
    const posts = await newpost.find({ userId: req.user._id }); 
    res.render("profile", { user: req.user, posts: posts }); 
  } else {
    return res.redirect("/login");
  }
});

router.get("/editpro/:id", async(req, res) => {
  if (req.isAuthenticated()) {
    const posts = await newpost.find({ userId: req.user._id }); 
    res.render("editpro", { user: req.user, posts: posts }); 
  } else {
    return res.redirect("/login");
  }
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/post/:postId/comment", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content } = req.body;

    const newComment = new Comment({
      content,
      postId,
      userId: req.user._id,
    });

    await newComment.save();

    res.redirect("/");
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/chating", (req, res) => {
  res.render("chating");
});


const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

router.post("/register", async (req, res) => {
  try {
    const { username, email, name, password } = req.body;

    if (!username || !email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new register({
      username,
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect("/")
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/upload", upload.single("image"), async function (req, res) {
  try {
    const newProduct = new newpost({
      title: req.body.title,
      discriptin: req.body.discriptin,
      image: req.file.filename,
      userId: req.user._id,
    });

    await newProduct.save();

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/editpro/:id", upload.single("avtar"), async function (req, res) {
  try {
    const { username, email, avtar } = req.body;
    const userId = req.params.id; 

    const updatedUser = await register.findByIdAndUpdate(userId,{ 
        username,
        email,
        avtar
        
      }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.redirect(404).json({ message: "User not found" });
    }

    if (req.file) {
      updatedUser.avtar = req.file.filename;
      await updatedUser.save();
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/failure",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("logout", "Logout successful");
    res.redirect("/");
  });
});

module.exports = router;
