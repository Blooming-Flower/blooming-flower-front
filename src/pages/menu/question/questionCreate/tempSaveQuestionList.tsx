import { IconButton, List, ListItem, Button, Alert } from "@mui/material";
import * as React from "react";

//css
import "@css/questionCreate/tempSaveQuestionList.scss";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { PATH } from "@common/domain";
import { $POST } from "@utils/request";
import { QUESTIONTYPE } from "@common/const";
import { useNavigate } from "react-router-dom";
import { ALERT } from "@common/const";
import { alert } from "@utils/alert";

const TempSaveQuestionList = (props: any) => {
  //문제유형 :  searchlecture
  const {
    width,
    height,
    rowData,
    setRowData,
    editorRef,
    setIsTempSave,
    onClickListItem,
    changeType,
  } = props;
  const [viewDatas, setViewDatas] = React.useState(
    rowData.map((data: any) => ({
      ...data.passageData,
      questionType:
        data.questionParams.length > 1
          ? "Q25"
          : data.questionParams[0].questionType,
    }))
  );
  const navigate = useNavigate();

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
  const onRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number
  ) => {
    e.stopPropagation();
    setRowData(
      rowData.reduce((acc: any, cur: any, index: number) => {
        if (index === idx) {
          return acc;
        }
        acc.push(cur);
        return acc;
      }, [])
    );
    changeType({ target: { value: "" } }, true);
  };

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
              <div key={idx}>
                <ListItem
                  className="checkbox-list"
                  value={row}
                  onClick={(e) => {
                    onClickListItem(row, idx);
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => onRemove(e, idx)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  }
                >
                  <div style={{ flex: 1 }}>{row.passageYear}</div>
                  <div
                    className="passageName"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 5,
                    }}
                    data-tooltip={row.passageName}
                  >
                    {row.passageName}
                  </div>
                  <div style={{ flex: 1 }}>{row.passageUnit}</div>
                  <div style={{ flex: 1 }}>{row.passageNumber}</div>
                  <div style={{ flex: 2 }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: "white",
                        background: "#727171",
                        borderRadius: 3,
                        padding: "1px 4px 1px 6px",
                      }}
                    >
                      {QUESTIONTYPE[row.questionType]}
                    </span>
                  </div>
                </ListItem>
              </div>
            );
          })
        )}
      </List>
      <div
        style={{ padding: 7, height: 48, borderTop: "0.5px solid lightgrey" }}
      >
        {rowData.length !== 0 && (
          <Button
            color="warning"
            size="large"
            variant="contained"
            onClick={() => {
              const params = rowData.map((data: any) => {
                const questionParams = data.questionParams.map((el: any) => {
                  const answerList = el.answerList.map((answer: any) => ({
                    answerContent: answer.answerContent,
                  }));

                  const chooseList = el.chooseList;
                  return {
                    questionSubTitle: el.questionSubTitle,
                    pastYn: el.pastYn,
                    questionType: el.questionType,
                    subBox: el.subBox,
                    answerList,
                    chooseList,
                  };
                });
                return {
                  passageId: data.passageData.passageId,
                  questionContent: data.questionContent,
                  questionTitle: data.questionTitle,
                  questionParams: questionParams,
                };
              });

              $POST("/api/v1/question/save", params, () => {
                alert.icon({
                  type: ALERT.SUCCESS,
                  text: "지문이 저장 되었습니다.",
                });
                navigate(PATH.QUESTION2);
              });
            }}
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
      </div>
    </div>
  );
};

export default TempSaveQuestionList;
