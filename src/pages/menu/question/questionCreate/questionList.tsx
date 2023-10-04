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
import { $GET } from "@utils/request";

const QuestionList = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };
  //문제유형 :  searchlecture
  const {
    width,
    height,
    rowData,
    setRowData,
    checked,
    setChecked,
    buttonName,
    editorRef,
  } = props;

  //리스트업 목록 삭제 버튼
  const onRemove = (value: any) => {
    setRowData(rowData.filter((el: any) => el !== value));
    if (checked && checked.indexOf(value.passageId) != -1) {
      // checked(지문 체크 배열) non-checked로 변경
      setChecked(checked.filter((el: any) => el !== value.passageId));
    }
  };

  return (
    <div className="questionList-item">
      <List
        sx={{
          // maxWidth: width,
          width: width,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          // maxHeight: height,
          height: height,
          "& ul": { padding: 0 },
        }}
      >
        {rowData.length === 0 && <Alert>{"지문을 선택해 주세요."}</Alert>}

        {rowData.map((row: any) => {
          return (
            <div key={row.passageId}>
              <ListItem
                className="checkbox-list"
                value={row}
                onClick={() => {
                  if (!editorRef) {
                    return;
                  }
                  $GET(
                    `/api/v1/passage/search/${row.passageId}`,
                    (result: any) => {
                      editorRef.current
                        .getInstance()
                        .setMarkdown(result.passageContent);
                    }
                  );
                }}
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
                <div>{row.passageYear}</div>
                <div>{row.passageUnit}</div>
                <div>{row.passageNumber}</div>
              </ListItem>
            </div>
          );
        })}

        <CustomButton
          domain={PATH.QUESTION6}
          label={"GO!"}
          type={"true"}
          params={rowData}
        >
          {buttonName}
        </CustomButton>
      </List>
    </div>
  );
};

export default QuestionList;
