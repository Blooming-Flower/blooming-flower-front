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
import { log } from "console";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { relative } from "path";

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
    removeRow,
    buttonName,
    editorRef,
    setPassageData,
    setIsTempSave,
    isExam,
    onClickListItem,
    totalCnt,
    noDelete,
  } = props;

  //리스트업 목록 삭제 버튼
  const onRemove = (row: any) => {
    removeRow(row);
  };

  const [checkSelect, setCheckSelect] = useState(0);

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
            // selected and (selected + hover) states
            '&& .Mui-selected, && .Mui-selected:hover': {
                bgcolor: 'red',
                '&, & .MuiListItemIcon-root': {
                    color: 'pink',
                },
            },
        }}
      >
        {rowData.length === 0 ? (
          <Alert>{"지문을 선택해 주세요."}</Alert>
        ) : (
          rowData.map((row: any) => {
            return (
              <div key={row.passageId}>
                <ListItem
                    selected={checkSelect == row}
                  className="checkbox-list"
                  value={row}
                  onClick={(e) => {
                      setCheckSelect(row);
                    if (onClickListItem) {
                      onClickListItem(row);
                    }
                  }}
                  secondaryAction={
                    noDelete ? (
                      <></>
                    ) : (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onRemove(row)}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )
                  }
                >
                  <div style={{ flex: 1 }}>{row.passageYear}</div>
                  <div
                    className="passageName"
                    style={{
                      // maxWidth: 65,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 6,
                    }}
                    data-tooltip={row.passageName}
                  >
                    {row.passageName}
                  </div>
                  <div style={{ flex: 1.5 }}>{row.passageUnit}</div>
                  <div style={{ flex: 1.5 }}>{row.passageNumber}</div>
                </ListItem>
              </div>
            );
          })
        )}
      </List>
      <div>
        {rowData.length !== 0 && (
          <div
            style={{
              padding: "7px",
              height: "53px",
              border: "0.5px solid lightgray",
            }}
          >
            {totalCnt ? <span style={{position: "relative", top: "7px"}}>Total. {totalCnt}</span> : <></>}
            <CustomButton
              domain={isExam ? PATH.QUESTION4 : PATH.QUESTION6}
              label={buttonName ?? "GO!"}
              type={"true"}
              params={rowData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
