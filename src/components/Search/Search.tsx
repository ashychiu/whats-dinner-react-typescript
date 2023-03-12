import React from "react";
import { useTheme } from "../../App";

export interface ISearchProps {
  searchRecipes: (event: React.FormEvent<HTMLFormElement>) => void;
  isSticky: boolean;
}
const Search = (props: ISearchProps) => {
  const { searchRecipes, isSticky } = props;

  const theme = useTheme();

  const searchbarClasses = "searchbar" + (isSticky ? " sticky" : null);

  return (
    <div
      className="hero__container"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <form id="searchform" className="searchform" onSubmit={searchRecipes}>
        <input
          required
          className={`form-input ${searchbarClasses}`}
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
