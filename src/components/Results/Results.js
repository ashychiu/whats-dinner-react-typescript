import React from "react";
import { useState, useEffect, useRef } from "react";
import { Card } from "@mui/material";
import "./Results.scss";

const Results = (props) => {
  const { results, isLoading, searchTerm } = props;
  const isFirstRender = useRef(true);
  const [showDetails, setShowDetails] = useState(null);

  const onHandleClick = (index) => {
    setShowDetails(showDetails === index ? null : index);
  };

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
        <h2>Showing Results for {searchTerm}</h2>
        {results.map((recipe, index) => {
          return (
            <div key={index}>
              <Card>
                <img src={recipe.recipe.images.REGULAR.url} alt="recipe" />
                <p>{recipe.recipe.label}</p>
                <button onClick={() => onHandleClick(index)}>
                  {showDetails === index ? "show less" : "show more"}
                </button>
                {showDetails === index && (
                  <>
                    <p>Cuisine type: {recipe.recipe.cuisineType || "N/A"}</p>
                    <p>Meal type: {recipe.recipe.mealType || "N/A"}</p>
                    <p>
                      Calories: {recipe.recipe.calories?.toFixed(2) || "N/A"}
                    </p>
                    <p>
                      No. of ingredients:{" "}
                      {recipe.recipe.ingredientLines?.length || "N/A"}
                    </p>
                  </>
                )}
              </Card>
            </div>
          );
        })}
      </section>
    );
};

export default Results;
