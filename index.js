const { engine } = require("express-edge");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

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

const storePost = require("./middleware/storePost");

app.use("/post/store", storePost);

app.set("views", `${__dirname}/views`);

app.get("/", homePageController);

app.get("/post/new", createPostController);

app.post("/post/store", storePostController);

app.get("/post/:id", getPostController);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
