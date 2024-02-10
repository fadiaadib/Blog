import express from "express";
import bodyParser from "body-parser";
import { findPost, getPosts, editPost, deletePost, addPost } from "./posts.js";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Blog Home Page
app.get("/", (req, res) => {
  res.render("blog.ejs", {
    posts: getPosts(),
  });
});

// Create a new blog
app.get("/post", (req, res) => {
  res.render("post.ejs");
});
app.post("/post", (req, res) => {
  addPost(req.body.title, req.body.body);
  res.redirect("/");
});

// Delete a post
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  deletePost(id);
  res.redirect("/");
});

// Show a post
app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.render("post.ejs", {
    post: findPost(id),
  });
});

// Edit a post
app.post("/:id", (req, res) => {
  const id = req.params.id;
  editPost(id, req.body.title, req.body.body);
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
