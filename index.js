const path = require("path");
const { engine } = require("express-edge");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Post = require("./database/models/Post");

const app = new express();

mongoose.connect("mongodb://localhost/BlogNodeJS", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(express.static("public"));
app.use(engine);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", `${__dirname}/views`);

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/store", (req, res) => {
  Post.create(req.body, (error, post) => {
    res.redirect("/");
  });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
