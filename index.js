const path = require("path");
const { engine } = require("express-edge");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");

const Post = require("./database/models/Post");
const createPostController = require("./controllers/createPost");

const app = new express();

mongoose.connect("mongodb://localhost/BlogNodeJS", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(fileUpload());
app.use(express.static("public"));
app.use(engine);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateCreatePostMiddleware = (req, res, next) => {
  if (
    !req.files.image ||
    !req.body.username ||
    !req.body.title ||
    !req.body.subtitle ||
    !req.body.content
  ) {
    return res.redirect("/post/new");
  }
  next();
};

app.use("/post/store", validateCreatePostMiddleware);

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

app.get("/post/new", createPostController);

app.post("/post/store", (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "public/post", image.name), error => {
    Post.create(
      {
        ...req.body,
        image: `/post/${image.name}`
      },
      (error, post) => {
        res.redirect("/");
      }
    );
  });
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post
  });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
