import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import { getPostsByCreator, getPostsBySearch } from "../../actions/posts";

const CreatorOrTag = () => {
  const { name } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (location.pathname.startsWith("/tags")) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, [dispatch, location.pathname, name]);

  if (!posts?.length) {
    return (
      <Typography variant="h6" align="center">
        No posts
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Divider sx={{ my: 4 }} />
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CreatorOrTag;
