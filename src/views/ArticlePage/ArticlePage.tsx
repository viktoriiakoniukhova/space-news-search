import { Box, Typography, Link } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import React from "react";
import Article from "../../components/Article/Article";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { CssBaseline } from "@mui/material";
import classes from "./index.module.scss";

import { useLocation, useNavigate } from "react-router";

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

export default function ArticlePage() {
  const { state } = useLocation();
  const { id } = state;
  const [article, setArticle] = React.useState<Article>();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    fetchArticleByID();
  }, []);

  function fetchArticleByID() {
    fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
      .then((response) => response.json())
      .then((data: Article) => {
        setArticle(data);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.mainBox}>
          <Box
            className={classes.imageBox}
            component="img"
            alt={article?.title}
            src={article?.imageUrl}
          ></Box>
          <Box className={classes.contentBox}>
            <Typography
              className={classes.title}
              fontWeight={theme.typography.fontWeightLight}
              variant="h5"
            >
              {article?.title}
            </Typography>
            <Typography
              className={classes.desc}
              fontWeight={theme.typography.fontWeightLight}
              variant="body1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              quidem amet, expedita voluptatibus atque, ea totam illo distinctio
              ducimus odio fugit maiores aliquid corporis eaque fugiat incidunt
              consectetur ipsum? Iure blanditiis cum voluptate, ex et eius
              veritatis provident nam velit error sed debitis corporis fugit,
              quisquam, quod sint quidem omnis neque esse? Dignissimos maxime
              doloribus impedit molestiae sequi veritatis est suscipit et
              dolorum voluptatem iusto, praesentium illo, quibusdam blanditiis.
              Earum exercitationem at magni soluta iusto numquam minus
              perspiciatis culpa voluptatibus impedit maiores vel quod corrupti
              suscipit blanditiis sapiente, incidunt est rerum dignissimos
              ullam! Ducimus eligendi ipsum tenetur? Aliquam dicta nam, hic
              fuga, quibusdam eius alias deserunt ipsa iste soluta fugiat sequi
              omnis, magnam illo quidem atque! Alias quaerat beatae vero quis
              nam sint pariatur explicabo omnis facere voluptatum dolorum
              assumenda illum suscipit autem delectus, in aliquam cum. Dolore
              nam voluptatibus quos provident. Voluptatibus, neque eum magnam
              molestiae perspiciatis possimus esse recusandae dignissimos,
              ducimus ab consectetur reprehenderit facere tenetur dolorum,
              impedit quia. Vitae saepe incidunt nobis aspernatur veniam!
              Necessitatibus sapiente praesentium delectus saepe consectetur sed
              eos commodi tenetur laboriosam temporibus reiciendis quos qui
              minus atque libero, aliquam omnis explicabo iure aliquid pariatur
              eius adipisci molestiae aspernatur. Neque excepturi sint veritatis
              ab itaque et id aliquam. Ipsa reiciendis omnis nam molestias.
              Optio non adipisci illum doloremque et aperiam officiis ullam iure
              rerum nobis itaque neque natus ipsa, quibusdam sit. Sit asperiores
              provident possimus omnis! Delectus alias sunt necessitatibus cum
              voluptatibus praesentium repudiandae? Voluptatem ut ea consectetur
              magni nulla cum cumque accusantium, dignissimos voluptate! Alias
              reprehenderit tempora commodi voluptates minima blanditiis iure
              harum quia fuga soluta eligendi ipsum, ea quos nulla ullam
              voluptas dignissimos eveniet quam hic dicta corporis impedit qui
              aut odit. Dolore exercitationem quasi architecto accusamus dolorum
              itaque, ad natus error ratione iste ipsam officia libero et, est
              reiciendis? Iure, amet.
            </Typography>
          </Box>
          <Box className={classes.linkBox}>
            <Link
              className={classes.link}
              fontWeight={theme.typography.fontWeightMedium}
              href="#"
              underline="hover"
              onClick={goBack}
            >
              <ArrowBack />
              Back to homepage
            </Link>
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
