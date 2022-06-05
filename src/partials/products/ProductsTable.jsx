import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Product from "./ProductsTableItem";

function ProductsTable({ totalResults, productsList, setOrderListBy }) {
  const { t } = useTranslation("global");
  const formatterEuro = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  let tableTitles = [
    { key: "id", title: t("productsTable.sku") },
    { key: "title", title: t("productsTable.article") },
    { key: "price", title: t("productsTable.price") },
    { key: "tax", title: t("productsTable.tax") },
    { key: "stock", title: t("productsTable.stock") },
  ];

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2
          className="font-semibold text-slate-800"
          data-testid="totalProductsTitle"
        >
          {t("productsTable.products-title")}:{" "}
          <span className="text-slate-400 font-medium">{totalResults}</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {tableTitles.map(({ key, title }) => (
                  <th
                    key={key}
                    className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
                    onClick={() => {
                      setOrderListBy((prev) => {
                        return {
                          value: key,
                          direction:
                            prev.value === key && prev.direction === "ASC"
                              ? "DESC"
                              : "ASC",
                        };
                      });
                    }}
                  >
                    <div className="font-semibold text-left">{title}</div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {productsList.map(({ id, title, price, tax, stock }) => {
                return (
                  <Product
                    key={id}
                    id={id}
                    title={title}
                    price={formatterEuro.format(price)}
                    tax={tax}
                    stock={stock ? stock : t("productsTable.stock-empty")}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
