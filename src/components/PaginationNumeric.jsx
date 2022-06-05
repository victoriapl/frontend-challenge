import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

function PaginationNumeric({ currentPage, setCurrentPage, totalResults }) {
  const { t } = useTranslation("global");
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(totalResults / 10));
  }, [totalResults]);

  return (
    <>
      <div className="flex justify-center">
        <ReactPaginate
          forcePage={currentPage}
          previousLabel={
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
            </svg>
          }
          nextLabel={
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          }
          breakLabel="..."
          onClick={({ isBreak }) =>
            isBreak && currentPage < 10 && pages > 30 ? false : true
          }
          pageCount={pages}
          marginPagesDisplayed="1"
          pageRangeDisplayed="3"
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={
            "inline-flex text-sm font-medium -space-x-px shadow-sm"
          }
          pageLinkClassName={
            "inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-white border border-slate-200 cursor-pointer"
          }
          previousLinkClassName={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2.5 bg-white border border-slate-200 ${
            currentPage === 0
              ? "text-slate-300"
              : "text-slate-600 hover:bg-blue-500 hover:text-white cursor-pointer"
          } shadow-sm`}
          nextLinkClassName={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2.5 bg-white  border border-slate-200 shadow-sm ${
            currentPage === pages - 1
              ? "text-slate-300"
              : "text-slate-600 hover:bg-blue-500 hover:text-white cursor-pointer"
          }`}
          breakLinkClassName={`inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-white border border-slate-200 cursor-pointer ${
            currentPage < 10 && pages > 30 ? "text-slate-300" : ""
          }`}
          activeClassName={"text-blue-500"}
        />
      </div>

      <div className="flex justify-center">
        <div className="text-sm text-slate-500 text-center sm:text-left py-2">
          <span className="font-medium text-slate-600">
            {(currentPage + 1) * 10 - 9}
          </span>{" "}
          {t("paginationNumeric.to")}{" "}
          <span className="font-medium text-slate-600">
            {(currentPage + 1) * 10 > totalResults
              ? totalResults
              : (currentPage + 1) * 10}
          </span>{" "}
          {t("paginationNumeric.of")}{" "}
          <span className="font-medium text-slate-600">{totalResults}</span>{" "}
          {t("paginationNumeric.results")}
        </div>
      </div>
    </>
  );
}

export default PaginationNumeric;
