import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a
          className="footer__author-link"
          href="https://github.com/ashychiu/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <p className="footer__author">
            Created by Ashley Chiu © 2022
            <IconButton
              aria-label="github"
              color="inherit"
              disableElevation
              disableRipple
            >
              <GitHubIcon fontSize="medium" color="inherit" />
            </IconButton>
          </p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
