import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(json());
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/uploads", express.static("uploads")); // Make the uploads folder public
app.get("/", (req, res) => {
  res.send("MERN-app server is running...");
});
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Connexion à la base de donnée réussit et le serveur tourne sur le port ${PORT}`
      )
    )
  )
  .catch((error) => console.log(error.message));
