import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Products from "../Products";

const mockProducts = [
  {
    id: "0",
    title: "Durable Iron Knife",
    price: 43.75,
    stock: 7,
    tax: "es_general_21",
  },
  {
    id: "1",
    title: "Intelligent Cotton Watch",
    price: 59.0,
    stock: 12,
    tax: "fr_general_20",
  },
  {
    id: "2",
    title: "Synergistic Steel Chair",
    price: 89.0,
    stock: 24,
    tax: "es_reduced_10",
  },
  {
    id: "3",
    title: "Rustic Plastic Clock",
    price: 129.0,
    stock: 26,
    tax: "fr_reduced_5.5",
  },
  {
    id: "4",
    title: "Ergonomic Concrete Keyboard",
    price: 129.0,
    stock: 7,
    tax: "es_reduced_10",
  },
];

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
