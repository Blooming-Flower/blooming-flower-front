import * as React from "react";
import { useEffect } from "react";
import { PATH } from "@common/domain";
import useClasses from "@utils/useClasses";
import logoWhite from "@images/common/urflowerMini.png";
import { Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

let currentPath = "";

const HeaderPc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuPath: string[] = [
    PATH.QUESTION0,
    PATH.QUESTION1,
    PATH.QUESTION2,
    PATH.QUESTION3,
    PATH.QUESTION4,
    PATH.QUESTION5,
  ];

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
        style={{ backgroundColor: "rgba(255,247,226,0.9)", height: "150px" }}
      ></div>
    </header>
  );
};
export default HeaderPc;
