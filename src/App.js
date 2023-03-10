import React from "react";
import { useState, useContext, createContext } from "react";
import axios from "axios";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Search from "./components/Search/Search.tsx";
import Results from "./components/Results/Results";

import "./styles/global.scss";
import { darkTheme, lightTheme } from "./utils/Theme";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export const themeContext = createContext();

export function useTheme() {
  const theme = useContext(themeContext);
  return theme;
}

export const themeStyles = (theme) => {
  return {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
  };
};

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");

  const RECIPE_API_URL = process.env.REACT_APP_RECIPE_API_URL;
  const RECIPE_API_ID = process.env.REACT_APP_RECIPE_API_ID;
  const RECIPE_API_KEY = process.env.REACT_APP_RECIPE_API_KEY;

  // const searchbar = document.getElementById("searchform");
  // const sticky = searchbar.offsetTop;

  // window.onscroll = () => {
  //   if (window.pageYOffset >= sticky + 600) {
  //     searchbar.classList.add("sticky");
  //   } else {
  //     searchbar.classList.remove("sticky");
  //   }
  // };

  const searchRecipes = async (event) => {
    event.preventDefault();
    setResults([]);
    setIsLoading(true);
    await axios
      .get(
        `${RECIPE_API_URL}?type=public&q=${event.target.searchbar.value}&app_id=${RECIPE_API_ID}&app_key=${RECIPE_API_KEY}&random=true`
      )
      .then((response) => {
        setResults(response.data.hits);
        setIsLoading(false);
        setSearchTerm(event.target.searchbar.value);
      });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const themeContextValue = theme === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <themeContext.Provider value={themeContextValue}>
        <div className="app">
          <FormGroup style={{ position: "fixed", right: 0 }}>
            <FormControlLabel
              control={<Switch onClick={toggleTheme} color="warning" />}
              label="Dark Mode"
            />
          </FormGroup>
          <Header />
          <Search searchRecipes={searchRecipes} />
          <Results
            results={results}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
          <Footer />
        </div>
      </themeContext.Provider>
    </>
  );
}

export default App;
