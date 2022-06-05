import React from "react";
import { useTranslation } from "react-i18next";
import EN from "./../images/en_lng.jpg";
import ES from "./../images/es_lng.png";

function Header() {
  const { i18n } = useTranslation();

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex"></div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <button onClick={() => i18n.changeLanguage("en")}>
              <img src={EN} width={40} style={{ height: 25 }} />
            </button>
            <button onClick={() => i18n.changeLanguage("es")}>
              <img src={ES} width={40} style={{ height: 25 }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
