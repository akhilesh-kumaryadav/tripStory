import { Container, Box, CircularProgress } from "@mui/material";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user";
import { useEffect } from "react";

const App = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(dispatch, navigate);
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Box sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/creators/:name" element={<CreatorOrTag />} />
          <Route path="/tags/:name" element={<CreatorOrTag />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" replace />}
          />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
