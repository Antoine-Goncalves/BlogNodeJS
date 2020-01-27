const { engine } = require("express-edge");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");

const mongoose = require("mongoose");

const homePageController = require("./controllers/homePage");

// Post

const createPostController = require("./controllers/createPost");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

// User

const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

const app = new express();

mongoose.connect("mongodb://localhost/BlogNodeJS", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(engine);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePost = require("./middleware/storePost");

app.use("/post/store", storePost);

app.set("views", `${__dirname}/views`);

app.get("/", homePageController);

// Post

app.get("/post/new", createPostController);
app.post("/post/store", storePostController);
app.get("/post/:id", getPostController);

// Register

app.get("/auth/register", createUserController);
app.post("/users/register", storeUserController);

// Login

app.get("/auth/login", loginController);
app.post("/users/login", loginUserController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
