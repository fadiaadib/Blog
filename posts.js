import fs from "fs";

let posts = [];
const dataPath = "./data.txt";

function getPostIdx(id) {
  return posts.findIndex((element) => {
    return element.id == id;
  });
}

function savePosts() {
  var data = JSON.stringify(posts);

  fs.writeFile(dataPath, data, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Data updated to disk");
    }
  });
}

function loadPosts() {
  fs.readFile(dataPath, { encoding: "utf8" }, (error, data) => {
    if (error) {
      throw error;
    } else {
      var result = JSON.parse(data);
      posts = result;
      console.log("Data read from disk");
    }
  });
}

export function getPosts() {
  return posts;
}

export function findPost(id) {
  const idx = getPostIdx(id);
  if (idx >= 0) {
    return posts[idx];
  }
}

export function addPost(title, body) {
  if (title.length && body.length) {
    posts.push({
      id: Math.random(),
      title: title,
      body: body,
      date: new Date().toDateString(),
    });

    savePosts();
  }
}

export function deletePost(id) {
  const idx = getPostIdx(id);
  if (idx >= 0) {
    posts.splice(idx, 1);

    savePosts();
  }
}

export function editPost(id, title, body) {
  const idx = getPostIdx(id);
  if (idx >= 0) {
    posts[idx] = {
      id: id,
      title: title,
      body: body,
      date: new Date().toDateString(),
    };

    savePosts();
  }
}

loadPosts();
