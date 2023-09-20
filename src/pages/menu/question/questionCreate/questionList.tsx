import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import React, { useState } from "react";

//css
import "@css/questionCreate/questionList.scss";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomButton from "@components/ui/button/custeomButton";
import { useNavigate } from "react-router-dom";
import { PATH } from "@common/domain";
import QuestionCrt from "./questionCrt";
import { GridCellWrapper } from "@mui/x-data-grid/components/cell/GridCell";

const QuestionList = (props: any) => {
  //const [open, setOpen] = React.useState(false);
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   setOpen(!open);
  // };
  //checkbox list up

  const [checkListItem, setCheckListItem] = React.useState([] as any);

  return (
    <div className="questionList-item">
      <List
        sx={{
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {/* {sampleData.map((params: any) => (
          <li>
            <ul>
              {params.date.map((log: any) => (
                <ListItem
                  key={log.date}
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <HighlightOffIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={`${log}`} />
                </ListItem>
              ))}
              {/* 복합지문 드롭다운 메뉴
              <ListItemButton onClick={handleClick}>
                <ListItemText primary="복합지문" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </ul>
          </li>
        ))}  */}

        <CustomButton domain={PATH.QUESTION6} label={"GO!"} type={"true"}>
          {props.Children}
        </CustomButton>
      </List>
    </div>
  );
};

export default QuestionList;

// <button onClick={() => { navigate(-1); }} >
// 이전 페이지로 이동하기
// </button>
