import React from "react";
import heroImage from "../../assets/hero-image.jpg";

const Header = () => {
  return (
    <header>
      <img
        className="header__hero-image"
        src={heroImage}
        alt="food dishes banner"
      />
      <p className="hero__heading">We build dinner together.</p>
      <a href="./index.html">
        <h1 className="hero__title">
          what's <br />
          dinner <br />
          tonight?
        </h1>
        <h1 className="hero__title-tab-desk">what's dinner tonight?</h1>
      </a>
      <div className="form__container">
        <p className="hero__tagline">
          Recipe suggestions based on what you've in the fridge
        </p>
      </div>
    </header>
  );
};

export default Header;
