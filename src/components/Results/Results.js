import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Results.scss";

const Results = (props) => {
  const { results, isLoading, searchTerm } = props;
  const isFirstRender = useRef(true);

  console.log(searchTerm, results);

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
        <div class="lds-ellipsis">
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
              <img src={recipe.recipe.images.REGULAR.url} alt="recipe" />
              <p>{recipe.recipe.label}</p>
            </div>
          );
        })}
      </section>
    );
};

export default Results;
