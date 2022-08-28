import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import fs from "fs";

export async function getPosts(req, res) {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export async function createPost(req, res) {
  var img = req.file.buffer;
  var encode_img = img.toString("base64");
  const post = req.body;
  var final_img = {
    image: new Buffer(encode_img, "base64"),
    contentType: req.file.mimetype,
    imgName: req.file.filename,
  };
  const newPostMessage = new PostMessage({
    ...post,
    img: final_img,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, message, creator, tags, likes, img } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, _id: id, likes, img };

  await PostMessage.findByIdAndUpdate(
    id,
    updatedPost,
    { new: true } // Reçevoir le post modifié à la place de l'original
  );

  res.json(updatedPost);
}

export async function deletePost(req, res) {
  const { id } = req.params;
  let path = `./uploads/${req.body.img}`;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
}

export async function likePost(req, res) {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
}
