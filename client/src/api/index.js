import axios from "axios";

const API = axios.create({ baseURL: "https://mern-app-back.herokuapp.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");

export const createPost = (formData) =>
  API({
    method: "post",
    url: "/posts",
    data: formData,
  });

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const updatePost = (id, updatedPost) => {
  delete updatedPost.img;
  API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id, img) => {
  API.delete(`/posts/${id}`, {
    data: {
      img: img,
    },
  });
};

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);
