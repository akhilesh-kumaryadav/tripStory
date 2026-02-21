import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Box,
} from "@mui/material";
import { likePost, deletePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.googleId || user?._id;

  const [likes, setLikes] = useState(post?.likes || []);

  const hasLikedPost = useMemo(() => likes.includes(userId), [likes, userId]);

  const handleLike = async (e) => {
    e.stopPropagation();

    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes((prev) => prev.filter((id) => id !== userId));
    } else {
      setLikes((prev) => [...prev, userId]);
    }
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const isCreator =
    user?.googleId === post?.creator || user?._id === post?.creator;

  const renderLikes = () => {
    if (likes.length === 0) {
      return (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;Like
        </>
      );
    }

    if (hasLikedPost) {
      return (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        height: "100%",
        position: "relative",
      }}
    >
      <ButtonBase
        onClick={openPost}
        sx={{ display: "block", textAlign: "initial" }}
      >
        <CardMedia
          component="img"
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt={post.title}
          sx={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0,0,0,0.5)",
            backgroundBlendMode: "darken",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "white",
          }}
        >
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
        {isCreator && (
          <Box
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
            }}
          >
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              sx={{ color: "white" }}
            >
              <MoreHorizIcon />
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </Box>
        <Typography variant="h5" gutterBottom sx={{ px: 2 }}>
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.message.split(" ").slice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        sx={{
          px: 2,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button size="small" disabled={!user} onClick={handleLike}>
          {renderLikes()}
        </Button>

        {isCreator && (
          <Button
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            &nbsp;Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
