require("dotenv").config();
const { engine } = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

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
const logoutController = require("./controllers/logout");

const app = new express();

mongoose.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(connectFlash());

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
});

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(engine);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectifAuthenticated");

app.set("views", `${__dirname}/views`);

app.get("/", homePageController);

// Post

app.get("/post/new", auth, createPostController);
app.post("/post/store", auth, storePost, storePostController);
app.get("/post/:id", getPostController);

// Register

app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);

// Login

app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);

// Logout

app.get("/auth/logout", auth, logoutController);

// Error

app.use((req, res) => res.render("not-found"));

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
