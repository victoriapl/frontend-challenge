export const TOTAL_RESULTS_QUERY = (props) =>
  `{ fetchProducts { pagination (${props}) { totalResults }}}`;

export const PRODUCTS_LIST_QUERY = (props) =>
  `{ fetchProducts { results (${props}) { id title price tax stock }}}`;
