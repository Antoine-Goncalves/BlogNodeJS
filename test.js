const mongoose = require("mongoose");

const Post = require("./database/models/Post");

mongoose.connect("mongodb://localhost/test-BlogNodeJS", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

Post.create(
  {
    title: "Mon premier post sur le blog",
    description: "Description du post",
    content: "Lorem Ipsum content."
  },
  (error, post) => {
    console.log(error, post);
  }
);
