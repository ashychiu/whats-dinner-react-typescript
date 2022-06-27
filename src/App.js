import "./styles/global.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import Results from "./components/Results/Results";
import axios from "axios";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const RECIPE_API_URL = process.env.REACT_APP_RECIPE_API_URL;
  const RECIPE_API_ID = process.env.REACT_APP_RECIPE_API_ID;
  const RECIPE_API_KEY = process.env.REACT_APP_RECIPE_API_KEY;

  console.log(RECIPE_API_URL);

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
    setResults([]);
    setIsLoading(true);
    event.preventDefault();
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

  return (
    <>
      <Header />
      <Search searchRecipes={searchRecipes} />
      <Results
        results={results}
        isLoading={isLoading}
        searchTerm={searchTerm}
      />
      <Footer />
    </>
  );
}

export default App;
