import { useState } from "react";
import {
  Grow,
  TextField,
  Button,
  Paper,
  Box,
  Chip,
  AppBar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`,
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchPost();
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Box
        sx={{
          height: { xs: "auto", sm: "calc(100vh - 100px)" },
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: 3,
          mt: 4,
        }}
      >
        <Box
          sx={{
            flex: 3,
            overflowY: { sm: "auto" },
            px: 4,
          }}
        >
          <Posts setCurrentId={setCurrentId} />
        </Box>

        <Box
          sx={{
            flex: 1,
            position: { sm: "sticky" },
            top: { sm: 20 },
            height: "fit-content",
          }}
        >
          <AppBar
            position="static"
            color="inherit"
            sx={{ borderRadius: 2, mb: 2, p: 2 }}
          >
            <TextField
              label="Search Story"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <TextField
              label="Search Tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              helperText="Press Enter to add tag"
              sx={{ mt: 2 }}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                />
              ))}
            </Box>

            <Button onClick={searchPost} variant="contained" sx={{ mt: 2 }}>
              Search
            </Button>
          </AppBar>

          <Form currentId={currentId} setCurrentId={setCurrentId} />

          {!searchQuery && !tags.length && (
            <Paper sx={{ borderRadius: 2, mt: 2, p: 2 }} elevation={6}>
              <Pagination page={page} />
            </Paper>
          )}
        </Box>
      </Box>
    </Grow>
  );
};

export default Home;
