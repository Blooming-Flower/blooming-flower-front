import { IconButton, List, ListItem, Button, Alert } from "@mui/material";
import * as React from "react";

//css
import "@css/questionCreate/tempSaveQuestionList.scss";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { PATH } from "@common/domain";
import { $POST } from "@utils/request";
import { QUESTIONTYPE } from "@common/const";

const TempSaveQuestionList = (props: any) => {
  //문제유형 :  searchlecture
  const { width, height, rowData, setRowData, editorRef, setIsTempSave } =
    props;
  const [viewDatas, setViewDatas] = React.useState(
    rowData.map((data: any) => ({
      ...data.passageData,
      questionType:
        data.questionParams.length > 1
          ? "Q25"
          : data.questionParams[0].questionType,
    }))
  );

  React.useEffect(() => {
    setViewDatas(
      rowData.map((data: any) => ({
        ...data.passageData,
        questionType:
          data.questionParams.length > 1
            ? "Q25"
            : data.questionParams[0].questionType,
      }))
    );
  }, [rowData]);

  //리스트업 목록 삭제 버튼
  const onRemove = (idx: number) => {
    setRowData(
      rowData.reduce((acc: any, cur: any, index: number) => {
        if (index === idx) {
          return acc;
        }
        acc.push(cur);
        return acc;
      }, [])
    );
  };

  // $POST("/api/v1/question/save", newQuestion, () => {
  //   setQuestionType("");
  //   setQuestionTitle("");
  //   setPastYn(false);
  //   setSubBox("");
  // subBoxRef.current.value = "";
  // setSubBox2("");
  // subBoxRef2.current.value = "";
  //   editorRef.current.getInstance().setHTML("");
  //   resetAnswerGrid();
  // });

  return (
    <div className="tempSaveQuestionList-item">
      <List
        sx={{
          width: width,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          height: height,
          "& ul": { padding: 0 },
        }}
      >
        {rowData.length === 0 ? (
          <Alert>{"임시 저장된 문제가 없습니다."}</Alert>
        ) : (
          viewDatas.map((row: any, idx: number) => {
            return (
              <div key={row.passageId}>
                <ListItem
                  className="checkbox-list"
                  value={row}
                  onClick={(e) => {
                    setIsTempSave(false);
                    console.log(rowData[idx]);

                    editorRef.current
                      .getInstance()
                      .setHTML(rowData[idx].questionContent);
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onRemove(idx)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  }
                >
                  <div>{row.passageYear}</div>
                  <div
                    className="passageName"
                    style={{
                      maxWidth: 65,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    data-tooltip={row.passageName}
                  >
                    {row.passageName}
                  </div>
                  <div>{row.passageUnit}</div>
                  <div>{row.passageNumber}</div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "white",
                      background: "#727171",
                      borderRadius: 3,
                      padding: "1px 7px 1px 6px",
                    }}
                  >
                    {QUESTIONTYPE[row.questionType]}
                  </div>
                </ListItem>
              </div>
            );
          })
        )}

        {rowData.length !== 0 && (
          <Button
            color="warning"
            size="large"
            variant="contained"
            onClick={() => {}}
            sx={{
              height: "40px",
              borderRadius: "10px",
              fontSize: "15px",
              float: "right",
            }}
          >
            {"SAVE"}
          </Button>
        )}
      </List>
    </div>
  );
};

export default TempSaveQuestionList;
