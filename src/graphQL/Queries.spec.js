import { TOTAL_RESULTS_QUERY, PRODUCTS_LIST_QUERY } from "./Queries";

describe("Queries", () => {
  it("returns the correct query to retrive the correct number of total results", () => {
    expect(TOTAL_RESULTS_QUERY("page: 1, perPage: 10")).toBe(
      `{ fetchProducts { pagination (page: 1, perPage: 10) { totalResults }}}`
    );
  });
  it("returns the correct query to retrive the correct products", () => {
    expect(PRODUCTS_LIST_QUERY("page: 1, perPage: 10")).toBe(
      `{ fetchProducts { results (page: 1, perPage: 10) { id title price tax stock }}}`
    );
  });
  it("returns the correct query to retrive the correct number of total results with filters", () => {
    expect(
      TOTAL_RESULTS_QUERY("page: 1, perPage: 10, titleFilter: 'Silk'")
    ).toBe(
      `{ fetchProducts { pagination (page: 1, perPage: 10, titleFilter: 'Silk') { totalResults }}}`
    );
  });
  it("returns the correct query to retrive the correct products with filtes", () => {
    expect(
      PRODUCTS_LIST_QUERY("page: 1, perPage: 10, orderBy: tax, order: DESC")
    ).toBe(
      `{ fetchProducts { results (page: 1, perPage: 10, orderBy: tax, order: DESC) { id title price tax stock }}}`
    );
  });
});
