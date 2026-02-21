import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const { user, isLoading } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user.name}: ${comment}`, post._id),
    );

    setComment("");
    setComments(newComments);

    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 3,
      }}
    >
      {/* Comments List */}
      <Box
        sx={{
          flex: 1,
          height: 200,
          overflowY: "auto",
        }}
      >
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>

        {comments?.map((c, i) => {
          const [author, text] = c.split(": ");

          return (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{author}</strong>: {text}
            </Typography>
          );
        })}

        <div ref={commentsRef} />
      </Box>

      {/* Write Comment */}
      <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
        <Typography gutterBottom variant="h6">
          Write a comment
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          sx={{ mt: 2 }}
          fullWidth
          disabled={!comment.length}
          variant="contained"
          onClick={handleComment}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
