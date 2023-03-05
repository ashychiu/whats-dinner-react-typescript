export const darkTheme = {
  backgroundColor: "#323232",
  color: "#fff",
  fontFamily: "Montserrat, sans-serif, Helvetica, Arial",
};

export const lightTheme = {
  backgroundColor: "#fff",
  color: "#000",
  fontFamily: "Montserrat, sans-serif, Helvetica, Arial",
};

export const themeStyles = (theme) => ({
  backgroundColor: theme.backgroundColor,
  color: theme.color,
  fontFamily: theme.fontFamily,
  h1: {
    color: theme.color,
  },
  h2: {
    color: theme.color,
  },
  p: {
    color: theme.color,
    fontSize: "2rem",
  },
});
