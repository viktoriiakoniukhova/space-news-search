import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import HomePage from "./views/HomePage/HomePage";
import ArticlePage from "./views/ArticlePage/ArticlePage";

const router = createBrowserRouter([
  {
    path: "space-news-search/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "space-news-search/articles/:articleId",
    element: <ArticlePage />,
  },
]);

function App() {
  return (
    <Box>
      <RouterProvider router={router} />
      <Outlet />
    </Box>
  );
}

export default App;
