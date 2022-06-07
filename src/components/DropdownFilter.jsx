import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Transition from "../utils/Transition";

function DropdownFilter({
  align,
  filtersApplied,
  setFiltersApplied,
  setCurrentPage,
}) {
  const { t } = useTranslation("global");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const filterOptions = [
    { value: "es_general_21", label: t("dropdownFilter.es_general_21") },
    { value: "es_reduced_10", label: t("dropdownFilter.es_reduced_10") },
    {
      value: "es_super-reduced_4",
      label: t("dropdownFilter.es_super-reduced_4"),
    },
    { value: "fr_general_20", label: t("dropdownFilter.fr_general_20") },
    { value: "fr_reduced_5.5", label: t("dropdownFilter.fr_reduced_5.5") },
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(filterOptions.length).fill(false)
  );

  useEffect(() => {
    setCheckedState(
      filterOptions.map((filter) =>
        filtersApplied.length && filtersApplied.includes(filter.value)
          ? true
          : false
      )
    );
  }, [dropdownOpen]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="text-sm font-medium">
          {t("dropdownFilter.filter-title")}
          {"  "}
          <span className="font-thin text-slate-400 mx-1">
            {filtersApplied.length ? filtersApplied.length : ""}
          </span>
        </span>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
            {t("dropdownFilter.filter-title")}
          </div>
          <ul className="mb-4">
            {filterOptions.map(({ value, label }, index) => {
              return (
                <li key={index} className="py-1 px-3 flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    id={`custom-checkbox-${index}`}
                    name={label}
                    value={value}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label
                    htmlFor={`custom-checkbox-${index}`}
                    className="flex items-center text-sm font-medium ml-2"
                  >
                    {label}
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                  onClick={() =>
                    setCheckedState(new Array(filterOptions.length).fill(false))
                  }
                >
                  {t("dropdownFilter.filter-clear")}
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    const filtersToApply = checkedState
                      .map((state, idx) => state && filterOptions[idx].value)
                      .filter((value) => !!value);
                    setCurrentPage(0);
                    setFiltersApplied(filtersToApply);
                    setDropdownOpen(false);
                  }}
                  onBlur={() => setDropdownOpen(false)}
                >
                  {t("dropdownFilter.filter-apply")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
