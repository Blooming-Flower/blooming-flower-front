import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  ListSubheader,
  Alert,
} from "@mui/material";
import React, { useState } from "react";

//css
import "@css/questionCreate/questionList.scss";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomButton from "@components/ui/button/custeomButton";
import { useNavigate } from "react-router-dom";
import { PATH } from "@common/domain";

const QuestionList = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };
  //문제유형 :  searchlecture
  const { width, height, rowData, setRowData, buttonName } = props;

  //리스트업 목록 삭제 버튼
  const onRemove = (value: any) => {
    setRowData(rowData.filter((el: any) => el !== value));
  };

  console.log("rowData;;;;", rowData);

  return (
    <div className="questionList-item">
      <List
        sx={{
          maxWidth: width,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: height,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {rowData.length === 0 && <Alert>{"지문을 선택해 주세요."}</Alert>}

        {rowData.map((row: any) => {
          return (
            <div key={row.passageId}>
              <ListItem
                className="checkbox-list"
                value={row}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onRemove(row)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                }
              >
                {row.passageYear}
                {row.passageUnit}
                {row.passageNumber}
                {row.passageId}
              </ListItem>
            </div>
          );
        })}

        <CustomButton domain={PATH.QUESTION6} label={"GO!"} type={"true"}>
          {buttonName}
        </CustomButton>
      </List>
    </div>
  );
};

export default QuestionList;
