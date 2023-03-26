import { rest } from "msw";

export const handlers = [
  rest.get(process.env.REACT_APP_RECIPE_API_URL, (req, res, ctx) => {
    //mocking response
    return res(
      ctx.json([
        {
          label: "Beef noodles",
          ingredients: ["beef", "noodles"],
          image: "http://www.edamam.com",
        },
        {
          label: "Lobster noodles",
          ingredients: ["lobster", "noodles"],
          image: "http://www.edamam.com",
        },
      ])
    );
  }),
];
