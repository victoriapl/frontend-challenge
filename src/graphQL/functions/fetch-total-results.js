import { ENDPOINT } from "../../constants";
import { TOTAL_RESULTS_QUERY } from "./../Queries";

export const fetchTotalResults = async (
  currentPage,
  filtersApplied,
  searchValue,
  setTotalResults
) => {
  const data = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: TOTAL_RESULTS_QUERY(`
          page: ${currentPage + 1},
          perPage: 10,
          ${
            filtersApplied.length
              ? `taxFilter: ${JSON.stringify(filtersApplied)}, `
              : ""
          },
          ${searchValue ? `titleFilter: ${JSON.stringify(searchValue)}` : ""},
        `),
    }),
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error("Error fetching data");
    } else {
      return response.json();
    }
  });
  setTotalResults(data.data.fetchProducts.pagination.totalResults);
};
