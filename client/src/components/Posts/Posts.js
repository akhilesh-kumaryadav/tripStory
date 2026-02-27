import React from "react";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!posts?.length) {
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ mt: 5, color: "text.secondary" }}
      >
        No posts yet.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1, mb: 15 }}>
      {posts.map((post) => (
        <Grid
          key={post._id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
