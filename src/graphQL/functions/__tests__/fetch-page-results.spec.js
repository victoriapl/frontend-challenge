import { fetchPageResults } from "../fetch-page-results";
import { act } from "@testing-library/react";
import mockProducts from "../../../__tests__/__mocks__/productsMock.json";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          fetchProducts: {
            pagination: { totalResults: mockProducts.length },
            results: mockProducts,
          },
        },
      }),
  })
);

describe("fetchPageResults", () => {
  it("gets the products depending the page and the filters selected", async () => {
    const currentPage = 1;
    const filtersApplied = 10;
    const searchValue = "";
    const orderListBy = {};
    const setProductsList = jest.fn((value) => value);

    await act(async () =>
      fetchPageResults(
        currentPage,
        filtersApplied,
        searchValue,
        orderListBy,
        setProductsList
      )
    );

    expect(setProductsList).toHaveBeenCalledWith(mockProducts);
  });
});
