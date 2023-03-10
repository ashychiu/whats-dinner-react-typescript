import "@testing-library/jest-dom";
import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("theme switch is present", () => {
  const { container } = render(<App />);
  logRoles(container);
  const themeSwitch = screen.getByRole("checkbox", { name: "Dark Mode" });
  expect(themeSwitch).toBeInTheDocument();
});

test("light mode is default", () => {
  render(<App />);
  const themeSwitch = screen.getByRole("checkbox", { name: "Dark Mode" });
  expect(themeSwitch).not.toBeChecked();
  const heading = screen.getByRole("heading", { name: "All Food Is Good" });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveStyle("color: rgb(0, 0, 0)|#000");
});

test("text colour changes when switching to dark mode", async () => {
  render(<App />);
  const themeSwitch = screen.getByRole("checkbox", { name: "Dark Mode" });
  await userEvent.click(themeSwitch);
  expect(themeSwitch).toBeChecked();
  const heading = screen.getByRole("heading", { name: "All Food Is Good" });
  expect(heading).toHaveStyle("color: rgb(255, 255, 255)|#fff");
});

test("search input is typable", async () => {
  const searchRecipes = jest.fn();
  render(<App searchRecipes={searchRecipes} />);
  const search = screen.getByRole("searchbox", { name: "" });
  expect(search).toBeInTheDocument();

  await userEvent.type(search, "eggs");
  expect(search).toHaveValue("eggs");
});

test("search function is called when submit", async () => {
  const searchRecipes = jest.fn();
  render(<App searchRecipes={searchRecipes} />);
  const search = screen.getByRole("searchbox", { name: "" });
  expect(search).toBeInTheDocument();

  await userEvent.type(search, "eggs");
  expect(search).toHaveValue("eggs");

  const submit = screen.getByRole("button", { name: "SEARCH" });
  expect(submit).toBeInTheDocument();
  await userEvent.click(submit);

  expect(searchRecipes).toBeCalledTimes(1);
});

test("search function is NOT called if there is no search term", async () => {
  const searchRecipes = jest.fn();
  render(<App searchRecipes={searchRecipes} />);
  const search = screen.getByRole("searchbox", { name: "" });
  expect(search).toBeInTheDocument();

  const submit = screen.getByRole("button", { name: "SEARCH" });
  expect(submit).toBeInTheDocument();
  await userEvent.click(submit);

  expect(searchRecipes).toBeCalledTimes(0);
});
