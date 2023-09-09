import * as React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ArticleIcon from '@mui/icons-material/Article';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@common/domain";
import { useEffect, useState } from "react";
import {Divider} from "@mui/material";

const NestedList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (link: string) => {
    navigate(link);
  };
  useEffect(() => {
    switch (location.pathname) {
      case PATH.QUESTION0:
        const check1 = document.querySelector(".nav1");
        check1!.classList.add("active");
        break;
      case PATH.QUESTION1:
        const check2 = document.querySelector(".nav2");
        check2!.classList.add("active");
        break;
      case PATH.QUESTION2:
        const check3 = document.querySelector(".nav3");
        check3!.classList.add("active");
        break;
      case PATH.QUESTION3:
        const check4 = document.querySelector(".nav4");
        check4!.classList.add("active");
        break;
      case PATH.QUESTION4:
        const check5 = document.querySelector(".nav5");
        check5!.classList.add("active");
        break;
      case PATH.QUESTION5:
        const check6 = document.querySelector(".nav6");
        check6!.classList.add("active");
    }
  }, []);

  return (
    <List
      className="sideNav"
      sx={{
        width: "100%",
        maxWidth: 260,
        bgcolor: "background.paper",
        paddingTop: "0px",
        position: "absolute",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        onClick={() => handleClick(PATH.QUESTION0)}
        className="nav1"
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="지문관리" />
      </ListItemButton>
      <Divider/>
      <ListItemButton
        onClick={() => handleClick(PATH.QUESTION1)}
        className="nav2"
      >
        <ListItemIcon>
          <SaveAltIcon />
        </ListItemIcon>
        <ListItemText primary="지문저장" />
      </ListItemButton>
      <Divider/>
      <ListItemButton
        onClick={() => handleClick(PATH.QUESTION2)}
        className="nav3"
      >
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="문제출제" />
      </ListItemButton>
      <Divider/>
      <ListItemButton
        onClick={() => handleClick(PATH.QUESTION3)}
        className="nav4"
      >
        <ListItemIcon>
          <NoteAddIcon />
        </ListItemIcon>
        <ListItemText primary="시험지제작" />
      </ListItemButton>
      <Divider/>
      <ListItemButton
        onClick={() => handleClick(PATH.QUESTION4)}
        className="nav5"
      >
        <ListItemIcon>
          <FileOpenIcon />
        </ListItemIcon>
        <ListItemText primary="시험지보기" />
      </ListItemButton>
      <Divider/>
      <ListItemButton
        onClick={() => handleClick(PATH.QUESTION5)}
        className="nav6"
      >
        <ListItemIcon>
          <PlagiarismIcon />
        </ListItemIcon>
        <ListItemText primary="시험지관리" />
      </ListItemButton>
      <Divider/>
    </List>
  );
};
export default NestedList;
