import React, { useContext } from "react";
import { themeContext } from "../../App";

const Search = (props) => {
  const darkTheme = useContext(themeContext);
  const themeStyles = {
    backgroundColor: darkTheme ? "#333" : "#fff",
    color: darkTheme ? "#fff" : "#000",
  };

  return (
    <div className="hero__container" style={themeStyles}>
      <form
        id="searchform"
        className="searchform"
        onSubmit={props.searchRecipes}
      >
        <input
          required
          className="form-input"
          type="search"
          id="searchbar"
          name="searchbar"
          placeholder="🔍 eg chicken, potato, cauliflower"
        />
        <button id="submitButton" type="submit">
          SEARCH
        </button>
      </form>
      <p className="hero__slogan">bon appetit!</p>
    </div>
  );
};

export default Search;
