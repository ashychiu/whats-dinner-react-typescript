import React from "react";
import { useState, useEffect } from "react";

const Results = (props) => {
  const [firstRender, setFirstRender] = useState(false);
  const results = props.results;

  useEffect(() => {
    setFirstRender(true);
  }, []);

  if (firstRender)
    return (
      <section class="recipe__container">
        <h2 class="recipe__section-title">All Food Is Good</h2>
        <div class="how-to__container">
          <img
            class="how-to__image"
            src="./assets/use-what-you-have.png"
            alt="use what you have"
          />
          <p class="how-to-use">
            <span class="text-strong">
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
          <p class="howtouse-tab-desk">
            <span class="text-strong">
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
  return (
    <section>
      <h2>Results</h2>
      {results.map((recipe, index) => {
        return (
          <div key={index}>
            <img src={recipe.recipe.images.REGULAR.url} alt="recipe" />
            <p>{recipe.recipe.label}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Results;
