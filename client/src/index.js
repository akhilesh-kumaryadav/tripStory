import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import App from "./App";
import { store } from "./reducers/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",
      dark: "#1B5E20",
      light: "#4CAF50",
    },
    secondary: {
      main: "#66BB6A",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Inter, Noto Sans JP, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId="OAUTH_CLIENT_ID">
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
