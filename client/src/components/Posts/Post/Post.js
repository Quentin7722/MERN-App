import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
  Modal,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [open, setOpen] = useState(false); // Modal
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);
  const base64String = btoa(
    new Uint8Array(post.img.image.data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  ); // convert your Buffer to base64 string

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} onClick={handleOpen}>
      <CardMedia
        className={classes.media}
        image={`data:image/png;base64,${base64String}`}
        title={post.title}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <CardMedia
            className={classes.modalImg}
            image={`data:image/png;base64,${base64String}`}
            title={post.title}
          />
          <CloseIcon className={classes.btnClose} onClick={handleClose} />
        </Box>
      </Modal>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" color="inherit" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" component="h2" color="primary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent className={classes.description}>
        <Typography variant="body2" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          color="primary"
          size="small"
          disabled={!user?.result}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(likePost(post._id));
          }}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            color="primary"
            size="small"
            disabled={!user?.result}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> &nbsp;Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
