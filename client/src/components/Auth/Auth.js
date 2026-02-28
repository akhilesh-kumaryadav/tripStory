import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import jwtDecode from "jwt-decode";

import { google, signIn, signUp } from "../../actions/auth";
import Input from "./Input";
import { addUser } from "../../reducers/features/userReducer";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackBar, setSnackBar] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isSignup
      ? dispatch(signUp(form, navigate, setSnackBar))
      : dispatch(signIn(form, navigate, setSnackBar));
  };

  const googleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const data = {
      email: decoded.email,
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      sub: decoded.sub,
    };

    dispatch(google(data, navigate, setSnackBar));

    navigate("/posts");
  };

  const googleError = () => console.log("Google Sign In was unsuccessful.");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </Grid>

          <GoogleLogin onSuccess={googleSuccess} onError={googleError} />

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
