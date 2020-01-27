const path = require("path");
const Post = require("../database/models/Post");

module.exports = (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "..", "public/post", image.name), error => {
    Post.create(
      {
        ...req.body,
        image: `/post/${image.name}`,
        auth: req.session.userId
      },
      (error, post) => {
        res.redirect("/");
      }
    );
  });
};
