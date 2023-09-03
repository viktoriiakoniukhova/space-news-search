import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CssBaseline>
  </ThemeProvider>
);

reportWebVitals();
