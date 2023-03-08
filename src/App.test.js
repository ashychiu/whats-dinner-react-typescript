import "@testing-library/jest-dom";
import { logRoles, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("theme switch is present", () => {
  const { container } = render(<App />);
  // logRoles(container);
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
  const wrapper = render(<App searchRecipes={searchRecipes} />);
  console.log(wrapper.debug());
  const search = screen.getByRole("searchbox", { name: "" });

  await userEvent.type(search, "eggs");
  expect(search).toHaveValue("eggs");
  const isLoading = screen.queryByTestId("isLoading");
  expect(isLoading).not.toBeInTheDocument();

  const submit = screen.getByRole("button", { name: "SEARCH" });
  expect(submit).toBeInTheDocument();
  await userEvent.click(submit);

  expect(searchRecipes).toBeCalledTimes(1);
});

// test("submit button", async () => {
//   render(<App />);
//   const submit = screen.getByRole("button", { name: "SEARCH" });
//   expect(submit).toBeInTheDocument();
//   await userEvent.click(submit);
//   await waitFor(
//     () => {
//       expect(
//         screen.findByText("Please fill out this field.")
//       ).toBeInTheDocument();
//     },
//     { timeout: 10000 }
//   );
// });
