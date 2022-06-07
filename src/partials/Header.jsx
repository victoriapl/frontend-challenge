import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EN from "./../icons/en_lng.jpg";
import ES from "./../icons/es_lng.png";

function Header() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setLanguage] = useState("es");

  const languages = [
    { key: "en", icon: EN },
    { key: "es", icon: ES },
  ];

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      setLanguage(language);
    }
  }, []);

  const changeLanguage = (language) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex"></div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {languages.map(({ key, icon }) => (
              <button
                key={key}
                onClick={() => changeLanguage(key)}
                className={`${
                  selectedLanguage === key
                    ? "border-2 border-slate-600 rounded-full"
                    : ""
                }`}
              >
                <img
                  src={icon}
                  width={25}
                  className="rounded-full"
                  style={{ height: 25 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
