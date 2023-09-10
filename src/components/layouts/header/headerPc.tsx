import * as React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import headerImg from "@images/common/IMG_5333.jpeg";
let currentPath = "";

const HeaderPc = () => {
  const location = useLocation();

  useEffect(() => {
    if (currentPath === location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    currentPath = location.pathname;
  }, [location]);

  return (
    <header>
      {/* 메인메뉴 */}
      <div
        id="headerTopWrap"
        className="top header2"
        style={{
          backgroundColor: "rgba(255,247,226,0.9)",
          height: "250px",
          width: "100%",
        }}
      >
        <img
          src={headerImg}
          alt="header"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </header>
  );
};
export default HeaderPc;
