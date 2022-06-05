import React from "react";
import { useTranslation } from "react-i18next";

function ProductsTableItem({ id, title, price, tax, stock }) {
  const { t } = useTranslation("global");
  const stockColor = (stock) => {
    if (stock > 0) {
      return "bg-emerald-100 text-emerald-600";
    } else {
      return "bg-rose-100 text-rose-500";
    }
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-600">{id}</div>
      </td>
      <td
        data-testid="productTitle"
        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
      >
        <div>{title}</div>
      </td>
      <td className="font-semibold px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{price}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-indigo-100 text-indigo-600">
          {t(`dropdownFilter.${tax}`)}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${stockColor(
            stock
          )}`}
        >
          {stock}
        </div>
      </td>
    </tr>
  );
}

export default ProductsTableItem;
