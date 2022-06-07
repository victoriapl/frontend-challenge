import { ENDPOINT } from "../../constants";
import { PRODUCTS_LIST_QUERY } from "./../Queries";

export const fetchPageResults = async (
  currentPage,
  filtersApplied,
  searchValue,
  orderListBy,
  setProductsList
) => {
  const data = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: PRODUCTS_LIST_QUERY(`
        page: ${currentPage + 1},
        perPage: 10,
        ${
          filtersApplied.length
            ? `taxFilter: ${JSON.stringify(filtersApplied)}, `
            : ""
        },
        ${searchValue ? `titleFilter: ${JSON.stringify(searchValue)}` : ""},
        ${
          orderListBy.value
            ? `orderBy: ${JSON.stringify(orderListBy.value)},
            order: ${JSON.stringify(orderListBy.direction)}`
            : ""
        }
      `),
    }),
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error("Error fetching data");
    } else {
      return response.json();
    }
  });
  setProductsList(data.data.fetchProducts.results);
};
