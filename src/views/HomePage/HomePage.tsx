import { Stack, Box, Typography, Divider } from "@mui/material";
import classes from "./index.module.scss";

import Search from "../../components/Search/Search";
import React from "react";
import Article from "../../components/Article/Article";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { CssBaseline } from "@mui/material";

type Article = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: [];
  events: [];
};

type Counters = {
  titleMatchesCounter: number;
  summaryMatchesCounter: number;
};

type ArticleWithCounters = Article & Counters;

export default function HomePage() {
  const [articles, setArticles] = React.useState<ArticleWithCounters[]>([]);

  function fetchArticles(searchInput: string) {
    const TITLE = "title";
    const SUMMARY = "summary";
    const searchInputWords = searchInput.split(" ");

    const titleSearch = `&${TITLE}_contains=`.concat(
      searchInputWords.join(`&${TITLE}_contains=`)
    );
    const descSearch = `&${SUMMARY}_contains=`.concat(
      searchInputWords.join(`&${SUMMARY}_contains=`)
    );

    const re = new RegExp(`(${searchInputWords.join("|")})`, "gi");

    fetch(
      `https://api.spaceflightnewsapi.net/v3/articles?_limit=100${titleSearch}${descSearch}`
    )
      .then((response) => response.json())
      .then((data: Article[]) => {
        setArticles(() => {
          return data.map((article: Article) => {
            const titleMatchesCounter = (article.title.match(re) || []).length;
            const newTitle = article.title.replace(
              re,
              (match: string) => `<mark>${match}</mark>`
            );
            const summaryMatchesCounter = (article.summary.match(re) || [])
              .length;
            const newSummary = article.summary.replace(
              re,
              (match: string) => `<mark>${match}</mark>`
            );
            return {
              ...article,
              title: newTitle,
              summary: newSummary,
              titleMatchesCounter: titleMatchesCounter,
              summaryMatchesCounter: summaryMatchesCounter,
            };
          });
        });
      });
  }

  function clearResults() {
    setArticles([]);
  }

  function sortArticles(
    articleA: ArticleWithCounters,
    articleB: ArticleWithCounters
  ) {
    if (articleA.titleMatchesCounter > articleB.titleMatchesCounter) return -1;
    if (articleA.titleMatchesCounter < articleB.titleMatchesCounter) return 1;

    if (articleA.summaryMatchesCounter > articleB.summaryMatchesCounter)
      return -1;
    if (articleA.summaryMatchesCounter < articleB.summaryMatchesCounter)
      return 1;
    return 0;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Stack direction="column" spacing={5} className={classes.pageMargin}>
          <Box>
            <Search
              fetchArticlesByInput={fetchArticles}
              clearResults={clearResults}
            />
          </Box>
          <Box>
            {articles.length ? (
              <>
                <Typography
                  className={classes.headerResults}
                  fontWeight={theme.typography.fontWeightMedium}
                >
                  Results: {articles.length}
                </Typography>
                <Divider></Divider>
                <Box className={classes.cardWrapper}>
                  {articles.sort(sortArticles).map((article) => {
                    return (
                      <Article
                        key={article.id}
                        id={article.id}
                        imageURL={article.imageUrl}
                        date={article.publishedAt}
                        title={article.title}
                        description={article.summary}
                      />
                    );
                  })}
                </Box>
              </>
            ) : (
              <Typography
                className={classes.headerResults}
                fontWeight={theme.typography.fontWeightMedium}
              >
                Search results will be displayed here.
              </Typography>
            )}
          </Box>
        </Stack>
      </CssBaseline>
    </ThemeProvider>
  );
}
