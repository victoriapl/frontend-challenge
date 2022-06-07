import React, { useState, useEffect } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/actions/SearchForm";
import ProductsTable from "../partials/products/ProductsTable";
import PaginationNumeric from "../components/PaginationNumeric";
import DropdownFilter from "../components/DropdownFilter";

import { fetchTotalResults } from "../graphQL/functions/fetch-total-results";
import { fetchPageResults } from "../graphQL/functions/fetch-page-results";

import { useTranslation } from "react-i18next";

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
    fetchTotalResults(
      currentPage,
      filtersApplied,
      searchValue,
      setTotalResults
    );

    //Fetch page results with filters
    fetchPageResults(
      currentPage,
      filtersApplied,
      searchValue,
      orderListBy,
      setProductsList
    );
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
