import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { ArrowRightAlt, CalendarToday } from "@mui/icons-material";
import classes from "./index.module.scss";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { CssBaseline } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

type ArticleProps = {
  id: number;
  imageURL: string;
  date: string;
  title: string;
  description: string;
};

export default function Article({
  id,
  imageURL,
  date,
  title,
  description,
}: ArticleProps) {
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const dayEnding = getDayEnding(day);

    return `${month} ${day}${dayEnding}, ${year}`;
  }

  function getDayEnding(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function createMarkup(html: string) {
    return { __html: html };
  }

  function cropString(str: string, numOfChar: number) {
    return str.length > numOfChar ? `${str.substring(0, numOfChar)}...` : str;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={imageURL}
            alt={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.dateContent}
              fontWeight={theme.typography.fontWeightLight}
              variant="caption"
            >
              <CalendarToday />
              {formatDate(date)}
            </Typography>
            <Typography
              className={classes.title}
              fontWeight={theme.typography.fontWeightLight}
              variant="h5"
              dangerouslySetInnerHTML={createMarkup(cropString(title, 200))}
            ></Typography>
            <Box className={classes.descBox}>
              <Typography
                className={classes.desc}
                fontWeight={theme.typography.fontWeightLight}
                variant="body1"
                dangerouslySetInnerHTML={createMarkup(
                  cropString(description, 200)
                )}
              ></Typography>
            </Box>
            <RouterLink
              to={{
                pathname: `articles/${id}`,
              }}
              state={{
                id: id,
              }}
            >
              <Link
                className={classes.link}
                fontWeight={theme.typography.fontWeightMedium}
                href="#"
                underline="hover"
              >
                Read More <ArrowRightAlt />
              </Link>
            </RouterLink>
          </CardContent>
        </Card>
      </CssBaseline>
    </ThemeProvider>
  );
}
