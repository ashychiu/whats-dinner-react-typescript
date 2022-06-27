import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Results.scss";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LaunchIcon from "@mui/icons-material/Launch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Results = (props) => {
  const { results, isLoading, searchTerm } = props;
  const isFirstRender = useRef(true);
  const [showDetails, setShowDetails] = useState(null);

  const handleExpandClick = (index) => {
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

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (!results.length && isFirstRender.current)
    return (
      <section className="recipe__container">
        <h2 className="recipe__section-title">All Food Is Good</h2>
        <div className="how-to__container">
          <img
            className="how-to__image"
            src="./assets/use-what-you-have.png"
            alt="use what you have"
          />
          <p className="how-to-use">
            <span className="text-strong">
              Don't ever throw out rotten food again!
            </span>{" "}
            <br />
            Use every ingredient you have (to get rid of...)
            <br />
            <br />
            Enter ingredient names in the search, recipe suggestions will be
            shown.
            <br />
            <br />
            Didn't see anything you like? <br />
            <br />
            Click search again for a new selection. You can also add more
            ingredients along the results.
          </p>
          <p className="howtouse-tab-desk">
            <span className="text-strong">
              Don't ever throw away rotten food again!{" "}
            </span>
            <br />
            Use every ingredient you have (to get rid of...😂)
            <br />
            <br />
            Enter ingredient names in the search bar, recipe suggestions will be
            shown. Didn't see anything you like? Click search again for a new
            selection of recipes. You can also add more ingredients along the
            results.
          </p>
        </div>
      </section>
    );
  if (!results.length && isLoading)
    return (
      <>
        <h1>Loading</h1>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
  if (!results.length && searchTerm)
    return (
      <h2 className="recipe__not-found">
        Oops! There is no match. Please try again.
      </h2>
    );
  else
    return (
      <section>
        <h2>Showing results for {searchTerm}</h2>
        <div className="recipe__list">
          {results.map((recipe, index) => {
            return (
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardMedia
                  component="img"
                  image={recipe.recipe.images.REGULAR.url}
                  alt={recipe.recipe.label}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.recipe.label}
                  </Typography>
                </CardContent>
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
                    <Typography paragraph>
                      Cuisine type: {recipe.recipe.cuisineType || "N/A"}
                    </Typography>
                    <Typography paragraph>
                      Meal type: {recipe.recipe.mealType || "N/A"}
                    </Typography>
                    <Typography paragraph>
                      Calories:{" "}
                      {`${recipe.recipe.calories?.toFixed(2)} kcal` || "N/A"}
                    </Typography>
                    <Typography paragraph>
                      {recipe.recipe.cautions?.length > 1 ? (
                        <span>{recipe.recipe.cautions[0]}</span>
                      ) : (
                        recipe.recipe.cautions || "N/A"
                      )}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            );
          })}
        </div>
      </section>
    );
};

export default Results;
