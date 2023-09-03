import {
  Box,
  Input,
  InputAdornment,
  Typography,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./index.module.scss";
import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { CssBaseline } from "@mui/material";

type SearchProps = {
  fetchArticlesByInput: (searchInput: string) => void;
  clearResults: () => void;
};

export default function Search({
  fetchArticlesByInput,
  clearResults,
}: SearchProps) {
  const searchQuery = window.localStorage.getItem("searchQuery")
    ? window.localStorage.getItem("searchQuery")
    : "";
  const [searchInput, setSearchInput] = React.useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = React.useState(
    searchQuery ? searchQuery : ""
  );

  React.useEffect(() => {
    const timer = setTimeout(() => setSearchInput(debouncedSearchInput), 1000);
    return () => clearTimeout(timer);
  }, [debouncedSearchInput]);

  React.useEffect(() => {
    if (searchInput !== "") {
      fetchArticlesByInput(searchInput);
      window.localStorage.setItem("searchQuery", searchInput);
    } else clearResults();
  }, [searchInput]);

  React.useEffect(() => {
    window.onbeforeunload = function () {
      window.localStorage.clear();
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.inputBox}>
          <FormControl className={classes.formBox}>
            <Typography
              className={classes.inputLabel}
              fontWeight={theme.typography.fontWeightMedium}
            >
              Filter by keywords
            </Typography>
            <Input
              className={classes.input}
              disableUnderline
              id="search"
              placeholder="Type smth about space…"
              value={debouncedSearchInput}
              onChange={(e) => setDebouncedSearchInput(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
