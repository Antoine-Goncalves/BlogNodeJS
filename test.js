const mongoose = require("mongoose");

const Post = require("./database/models/Post");

mongoose.connect("mongodb://localhost/test-BlogNodeJS", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

Post.find({}, (error, posts) => {
  console.log(error, posts);
});

// Post.create(
//   {
//     title: "Mon deuxième post sur le blog",
//     description: "Seconde Description du post",
//     content: "Second Lorem Ipsum content."
//   },
//   (error, post) => {
//     console.log(error, post);
//   }
// );
