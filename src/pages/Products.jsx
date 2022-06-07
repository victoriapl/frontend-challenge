import React, { useState, useEffect } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/actions/SearchForm";
import ProductsTable from "../partials/products/ProductsTable";
import PaginationNumeric from "../components/PaginationNumeric";
import DropdownFilter from "../components/DropdownFilter";
import { useTranslation } from "react-i18next";

const ENDPOINT = "http://vps-123eb2fc.vps.ovh.net/graphql";
const TOTAL_RESULTS_QUERY = (props) => `{
  fetchProducts {
    pagination (${props}) {
      totalResults
    }
  }
}`;

const PRODUCTS_LIST_QUERY = (props) => `{
  fetchProducts {
    results (${props}) {
      id
      title
      price
      tax
      stock
    }
  }
}`;

function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [orderListBy, setOrderListBy] = useState({
    value: "",
    direction: "",
  });
  const { t } = useTranslation("global");

  useEffect(() => {
    // Fetch nomber of total results with filters
    const fetchTotalResults = async () => {
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

    //Fetch page results with filters
    const fetchPageResults = async () => {
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

    fetchTotalResults();
    fetchPageResults();
  }, [filtersApplied, currentPage, searchValue, orderListBy]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  {t("products.catalog-title")}
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                <SearchForm
                  placeholder={t("products.search")}
                  setSearchValue={setSearchValue}
                  setCurrentPage={setCurrentPage}
                />
                {/* Filter button */}
                <DropdownFilter
                  align="right"
                  filtersApplied={filtersApplied}
                  setFiltersApplied={setFiltersApplied}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>

            {/* Table */}
            <ProductsTable
              totalResults={totalResults}
              productsList={productsList}
              orderListBy={orderListBy}
              setOrderListBy={setOrderListBy}
              setCurrentPage={setCurrentPage}
            />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationNumeric
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalResults={totalResults}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
