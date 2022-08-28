import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid
          className={classes.post}
          key={post._id}
          item
          xs={12}
          sm={6}
          md={6}
          xl={4}
        >
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
