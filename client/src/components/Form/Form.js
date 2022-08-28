import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const form = useRef(null);
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );
  const [inputValue, setInputValue] = useState("");
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
  });

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setInputValue("");
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(form.current);
    formData.append("name", user?.result?.name);
    if (currentId === 0) {
      dispatch(createPost(formData));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.smallPaper}>
        <Typography variant="h6" align="center" className={classes.bold}>
          Veuillez vous authentifier pour partager et liker les publications
          &#128274;
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        ref={form}
      >
        <Typography variant="h6">{currentId ? "Modifier" : "Créer"}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Titre"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (séparez avec une virgule)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        {!currentId && (
          <input
            type="file"
            className={classes.inputFile}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            name="img"
          />
        )}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Publier
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
