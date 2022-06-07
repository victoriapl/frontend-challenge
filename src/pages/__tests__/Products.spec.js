import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Products from "../Products";
import mockProducts from "../../__tests__/__mocks__/productsMock.json";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          fetchProducts: {
            pagination: { totalResults: 8 },
            results: mockProducts,
          },
        },
      }),
  })
);

describe("Products", () => {
  it("loads products and total results on mount", async () => {
    await act(async () =>
      render(
        <Router>
          <Products />
        </Router>
      )
    );
    const totalProductsTitle = screen.getByTestId("totalProductsTitle");
    expect(totalProductsTitle.textContent).toBe(
      "productsTable.products-title: 8"
    );

    const productsTitles = screen.getAllByTestId("productTitle");
    expect(productsTitles[0].textContent).toBe("Durable Iron Knife");
    expect(productsTitles[3].textContent).toBe("Rustic Plastic Clock");
  });
});
