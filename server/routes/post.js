import express, { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";
import multer from "../middleware/multer.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, multer, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
