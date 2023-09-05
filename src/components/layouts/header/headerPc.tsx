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

  const defaultTab = {
    fontSize: "1.5rem",
    outline: "none",
    fontFamily: "Noto Sans KR",
    width: "100%",
    fontWeight: "800px",
  };
  const handleClick = (params: string) => {
    navigate(params);
  };
  const useStyles = (theme: any) => ({
    customStyleOnTab: Object.assign({ color: "#fff" }, defaultTab),
    customStyleOnTab2: Object.assign({ color: "rgb(255,255,255)" }, defaultTab),
    activeTab: Object.assign(
      { color: "#5094e9", fontWeight: "bold", border: 0, right: 0 },
      defaultTab
    ),
    subActiveTab: Object.assign(
      { color: "#5094e9", fontWeight: "bold", border: 0, right: 0 },
      defaultTab
    ),
    sX: {
      width: "100%",
      margin: "0 0 40",
      borderBottom: 1,
      borderColor: "#d5d5d5",
    },
    sp: {
      width: "100%",
      flexGrow: "1!important",
      webkitBoxFlex: "1!important",
      msFlexPositive: "1!important",
    },
    img: {
      width: "100px",
    },
    spacer: {
      width: "100%",
    },
    hidden: {
      display: "none",
    },
  });

  const classes = useClasses(useStyles);

  const Menu = (props: { title: string; menu: string }) => {
    return (
      <li
        onClick={() => {
          handleClick(props.menu);
        }}
      >
        <p>{props.title}</p>
      </li>
    );
  };

  return (
    <header>
      {/* 메인메뉴 */}
      <div
        id="headerTopWrap"
        className="top header2"
        style={{ backgroundColor: "rgba(255,247,226,0.9)" }}
      >
        <Link to="/">
          <img style={classes.img} src={logoWhite} alt="로고" />
        </Link>
        <Box sx={classes.activeTab}>
          <ul className="menu">
            <li>
              <Link to={menuPath[0]}>지문저장</Link>
              <ul className="submenu submenu1">
                <div></div>
                {/*	<Menu title="지문저장" menu={PATH.QUESTION0} />*/}
                {/*	<Menu title="지문관리" menu={PATH.QUESTION1} />*/}
                {/*	<Menu title="문제출제" menu={PATH.QUESTION2} />*/}
                {/*	<Menu title="시험지제작" menu={PATH.QUESTION3} />*/}
                {/*	<Menu title="시험지보기" menu={PATH.QUESTION4} />*/}
                {/*	<Menu title="시험지관리" menu={PATH.QUESTION5} />*/}
              </ul>
            </li>
            <li>
              <Link to={menuPath[1]}>지문관리</Link>
              <ul className="submenu submenu2">
                <div></div>
                {/*	<Menu title="서브메뉴1" menu={PATH.MENU1SUB0} />*/}
                {/*	<Menu title="서브메뉴2" menu={PATH.MENU1SUB1} />*/}
              </ul>
            </li>
            <li>
              <Link to={menuPath[2]}>문제출제</Link>
              <ul className="submenu submenu3">
                <div></div>
                {/*	<Menu title="서브메뉴1" menu={PATH.MENU2SUB0} />*/}
                {/*	<Menu title="서브메뉴2" menu={PATH.MENU2SUB1} />*/}
              </ul>
            </li>
            <li>
              <Link to={menuPath[3]}>시험지제작</Link>
              <ul className="submenu submenu4">
                <div></div>
                {/*	<Menu title="서브메뉴1" menu={PATH.MENU3SUB0} />*/}
                {/*	<Menu title="서브메뉴2" menu={PATH.MENU3SUB1} />*/}
                {/*	<Menu title="서브메뉴3" menu={PATH.MENU3SUB2} />*/}
              </ul>
            </li>
            <li>
              <Link to={menuPath[4]}>시험지보기</Link>
              <ul className="submenu submenu5">
                <div></div>
                {/*	<Menu title="서브메뉴1" menu={PATH.MENU4SUB0} />*/}
                {/*	<Menu title="서브메뉴2" menu={PATH.MENU4SUB1} />*/}
                {/*	<Menu title="서브메뉴3" menu={PATH.MENU4SUB2} />*/}
              </ul>
            </li>
            <li>
              <Link to={menuPath[5]}>시험지관리</Link>
              <ul className="submenu submenu6">
                <div></div>
                {/*	<Menu title="서브메뉴1" menu={PATH.MENU5SUB0} />*/}
              </ul>
            </li>
          </ul>
        </Box>
      </div>
    </header>
  );
};
export default HeaderPc;
