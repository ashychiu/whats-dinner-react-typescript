import React from "react";
import { useTheme } from "../../App";

export interface ISearchProps {
  searchRecipes: (event: React.FormEvent<HTMLFormElement>) => void;
}
const Search = (props: ISearchProps) => {
  const { searchRecipes } = props;

  const theme = useTheme();

  return (
    <div
      className="hero__container"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <form id="searchform" className="searchform" onSubmit={searchRecipes}>
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
