import Footer from "./footer";
import Header from "./header";

import "@css/layout.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { RootState } from "@modules/reducer";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

import Popup from "@components/ui/popup";
import "swiper/css";
import "swiper/swiper-bundle.css";

import HeaderTop from "./header/headerTop";
import { Button, Fab, Fade, Slide } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import NestedList from "@components/layouts/header/nav";

const Layout = (props: { children: React.ReactNode; main?: boolean }) => {
  const navigate = useNavigate();
  const indexView = useRef<HTMLDivElement>(null);
  const isPopup: boolean = useSelector(
    (state: RootState) => state.layOutReducer.isPopup
  );
  const el: React.ReactNode = useSelector(
    (state: RootState) => state.layOutReducer.children
  );

  let [scroll, setScroll] = useState(false);

  useEffect(() => {
    indexView.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  const handleScroll = () => {
    const top = document.querySelector(".container .top") as HTMLDivElement;

    if (window.scrollY > 50) {
      top.style.backgroundColor = "rgba(255,255,255,0.13)";
      setScroll(true);
    } else {
      top.style.backgroundColor = "rgba(255,247,226,0.9)";
      setScroll(false);
    }
  };

  return (
    <div id="wrap">
      {/* <MenuList /> */}
      <div className="container">
        <div id="back-to-top-anchor" />
        <div id="img-container" ref={indexView}>
          <Header status={scroll} />
          <div
            id="mouse-scroll"
            style={
              !scroll ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            <div className="mouse">
              <div className="mouse-in"></div>
            </div>
          </div>
        </div>
        <main style={props.main ? {} : { marginTop: "0px" }}>
          <NestedList />
          <div className="contents">
            <div>{props.children}</div>
          </div>
        </main>
        <Footer />
      </div>
      <HeaderTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </HeaderTop>
      <Popup id="popupWrap" open={isPopup} styleType={0}>
        <>{el}</>
      </Popup>
    </div>
  );
};

export default Layout;
