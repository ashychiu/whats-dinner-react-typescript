import React, { useContext } from "react";
import { themeContext } from "../../App";
import food from "../../assets/bouncing-food.png";

const Home = () => {
  const darkTheme = useContext(themeContext);
  const themeStyles = {
    backgroundColor: darkTheme ? "#333" : "#fff",
    color: darkTheme ? "#fff" : "#000",
  };

  return (
    <section className="recipe__container" style={themeStyles}>
      <h2 className="recipe__section-title">All Food Is Good</h2>
      <div className="how-to__container">
        <img className="how-to__image" src={food} alt="use what you have" />
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
};

export default Home;
