import React from "react";
import { useState, useEffect, useRef } from "react";

import "./Results.scss";
import Home from "../Home/Home.tsx";
import ResultsModal from "../ResultsModal/ResultsModal.tsx";
import { useTheme } from "../../App";

import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Launch as LaunchIcon,
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
  ImageNotSupported as ImageNotSupportedIcon,
} from "@mui/icons-material";

import { Box } from "@mui/system";

// export interface IResultsProps {
//   results: [];
//   isLoading: boolean;
//   searchTerm: string;
// }

const Results = (props) => {
  const { results, isLoading, searchTerm } = props;
  const isFirstRender = useRef(true);
  const [showDetails, setShowDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState();
  const theme = useTheme();

  const themeStyles = {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
  };

  const handleModalClick = (recipe) => {
    setShowModal(true);
    setRecipe(recipe);
  };

  const handleModalClose = () => setShowModal(false);

  const handleExpandClick = (index: number) => {
    setShowDetails(showDetails === index ? null : index);
  };

  const ExpandMore = styled((props, index) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const imgError = (image) => {
    image.onerror = "";
    image.src = { ImageNotSupportedIcon };
    return true;
  };

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (!results.length && !isLoading) return <Home />;
  if (!results.length && isLoading)
    return (
      <section
        className="recipe__loading recipe__container"
        style={themeStyles}
      >
        <div className="lds-ellipsis" data-testid="isLoading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    );
  if (!results.length && searchTerm)
    return (
      <section
        className="recipe__loading recipe__container"
        style={themeStyles}
      >
        <h2 className="recipe__not-found">
          Oops! There is no match. Please try again.
        </h2>
      </section>
    );
  else
    return (
      <section className="recipe__container" style={themeStyles}>
        <h2>Showing results for {searchTerm}</h2>
        <div className="recipe__list">
          {results.map((recipe, index) => {
            return (
              <Box key={index} mb={3}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardActionArea onClick={() => handleModalClick(recipe)}>
                    <CardMedia
                      height="300"
                      component="img"
                      image={recipe.recipe.images.REGULAR.url}
                      imgProps={{
                        onError: imgError,
                      }}
                      alt={recipe.recipe.label}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {recipe.recipe.label}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      href={recipe.recipe.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LaunchIcon />
                    </IconButton>
                    <ExpandMore
                      expand={showDetails === index}
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={showDetails === index}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={showDetails === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography paragraph>{recipe.recipe.label}</Typography>
                      <Typography paragraph>
                        Cuisine type: {recipe.recipe.cuisineType || "N/A"}
                      </Typography>
                      <Typography paragraph className="capitalize-first">
                        Meal type: {recipe.recipe.mealType || "N/A"}
                      </Typography>
                      <Typography paragraph>
                        Calories:{" "}
                        {`${recipe.recipe.calories?.toFixed(2)} kcal` || "N/A"}
                      </Typography>
                      <Typography paragraph>
                        Cautions: {recipe.recipe.cautions || "N/A"}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Box>
            );
          })}
        </div>
        <ResultsModal
          show={showModal}
          recipe={recipe}
          close={handleModalClose}
        />
      </section>
    );
};

export default Results;
