import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import tripStoryText from "../../images/tripStoryText.png";
import { signOut } from "../../actions/auth";
import { useState } from "react";

const Navbar = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const [snackBar, setSnackBar] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut(setSnackBar));
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (snackBar) {
    return (
      <Snackbar
        open={Boolean(snackBar)}
        autoHideDuration={4000}
        onClose={() => setSnackBar("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setSnackBar("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackBar}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderRadius: 3,
        my: 4,
        px: 6,
        py: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          src={tripStoryText}
          alt="trip-story"
          sx={{ height: 45 }}
        />
      </Box>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: { xs: "auto", sm: 400 },
        }}
      >
        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "auto", sm: 400 },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Avatar
              alt={user.name}
              src={user.imageUrl}
              sx={{
                bgcolor: green[600],
                color: (theme) =>
                  theme.palette.getContrastText(deepPurple[500]),
              }}
            >
              {user.name.charAt(0)}
            </Avatar>

            <Typography
              variant="h6"
              sx={{
                mx: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              {user.name}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        ) : (
          <Button component={Link} to="/auth" variant="contained">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
