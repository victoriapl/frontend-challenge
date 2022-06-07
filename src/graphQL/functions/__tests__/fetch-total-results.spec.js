import { fetchTotalResults } from "../fetch-total-results";
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

describe("fetchTotalResults", () => {
  it("gets the total number of products depending the page and the filters selected", async () => {
    const currentPage = 1;
    const filtersApplied = 10;
    const searchValue = "";
    const setTotalResults = jest.fn((value) => value);

    await act(async () =>
      fetchTotalResults(
        currentPage,
        filtersApplied,
        searchValue,
        setTotalResults
      )
    );

    expect(setTotalResults).toHaveBeenCalledWith(5);
  });
});
