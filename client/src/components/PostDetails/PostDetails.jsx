import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";

import CommentSection from "./CommentSection";
import { useEffect } from "react";
import { getPost } from "../../actions/posts";
import { DEFAULT_IMAGE } from "../../utils/constants";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, isLoading } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          borderRadius: 3,
          height: "39vh",
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const post = posts?.find((p) => p._id === id);
  if (!post) {
    return null;
  }

  const recommendedPosts = posts.filter((p) => p._id !== post._id);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }} elevation={6}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3">Title: {post.title}</Typography>
          <Typography gutterBottom variant="h6" color="text.secondary">
            Tags:{" "}
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                style={{ textDecoration: "none" }}
              >
                #{tag}{" "}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1">
            Message: {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${post.name}`}
              style={{ textDecoration: "none", marginLeft: 4 }}
            >
              {post.name}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" fontWeight="bold">
            Realtime Chat - coming soon!
          </Typography>
          <Divider sx={{ my: 3 }} />
          <CommentSection post={post} />
          <Divider sx={{ my: 3 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box
            component="img"
            src={post.selectedFile || DEFAULT_IMAGE}
            alt={post.title}
            sx={{
              width: "100%",
              borderRadius: 3,
              objectFit: "cover",
              maxHeight: 600,
            }}
          />
        </Box>
      </Box>
      {!!recommendedPosts.length && (
        <Box sx={{ mt: 5 }}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              flexWrap: "nowrap",
              pb: 2,
              px: 2,
            }}
          >
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <Box
                  key={_id}
                  onClick={() => openPost(_id)}
                  sx={{
                    cursor: "pointer",
                    p: 2,
                    borderRadius: 2,
                    minWidth: 250,
                    flexShrink: 0,
                    "&:hover": { boxShadow: 3 },
                  }}
                >
                  <Typography variant="h6">Title: {title}</Typography>
                  <Typography variant="subtitle2">Name: {name}</Typography>
                  <Typography variant="subtitle2">
                    Message: {message.substring(0, 80)}...
                  </Typography>
                  <Typography variant="subtitle1">
                    Likes: {likes?.length ?? 0}
                  </Typography>

                  <Box
                    component="img"
                    src={selectedFile || DEFAULT_IMAGE}
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      mt: 1,
                      borderRadius: 2,
                    }}
                  />
                </Box>
              ),
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetails;
