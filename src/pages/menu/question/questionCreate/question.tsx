import { DEFAULT_QUESTION, QUESTIONTYPE, WRITE_TYPES } from "@common/const";
import { StyledTextarea } from "@components/ui/text/textarea";
import * as React from "react";
import ChooseDataGrid from "./chooseDataGrid";
import { useGridApiRef } from "@mui/x-data-grid";
import AnswerDataGrid from "./answerDataGrid";
import {
  Checkbox,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

const Question = React.forwardRef((props: { questionType: string }, ref) => {
  const [questionType, setQuestionType] = React.useState(
    ["Q25", ""].includes(props.questionType) ? "Q1" : props.questionType
  );
  const [questionTitle, setQuestionTitle] = React.useState("");
  const [pastYn, setPastYn] = React.useState(false);
  React.useImperativeHandle(ref, () => ({
    getQuestionParams: () => {
      if (props.questionType === "Q25") {
        return {
          questionSubTitle: questionTitle,
          pastYn,
          questionType,
          subBox: "",
          chooseList: chooseRef2.current?.getChooseList() ?? [],
          answerRef2: answerRef2.current.getAnswerList(),
        };
      }
      return {
        pastYn: false,
        questionType,
        subBox: "",
        chooseList: chooseRef2.current?.getChooseList() ?? [],
        answerRef2: answerRef2.current.getAnswerList(),
      };
    },
    changeQuestionType: (newType: string) => {
      setQuestionType(newType);
    },
  }));

  const [subBox, setSubBox] = React.useState("");
  const subBoxRef = React.useRef<any>();
  const [subBox2, setSubBox2] = React.useState("");
  const subBoxRef2 = React.useRef<any>();
  const chooseRef = useGridApiRef();
  const chooseRef2 = React.useRef({
    getChooseList: () => [],
  });
  const answerRef = useGridApiRef();
  const answerRef2 = React.useRef({
    getAnswerList: () => [],
    resetWriteTypeRows: () => {},
  });

  const changeType = (e: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = e;
    setQuestionType(value as string);
    setQuestionTitle(DEFAULT_QUESTION[value]);
    answerRef2.current.resetWriteTypeRows();
  };

  // const chooseList = chooseRef2.current.getChooseList();
  // const answerList = answerRef2.current.getAnswerList();
  return !questionType ? (
    <></>
  ) : (
    <>
      {props.questionType === "Q25" ? (
        <>
          <Grid container spacing={0} className="table-container">
            <Grid xs={1} item={true}>
              <div className="table-title table-top">유형</div>
            </Grid>
            <Grid xs={2} item={true}>
              <div className="table-content table-top">
                <FormControl className="table-select">
                  <Select
                    value={questionType}
                    onChange={changeType}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {Object.entries(QUESTIONTYPE)
                      .filter(([type]) => type !== "Q25")
                      .map(([type, text]) => (
                        <MenuItem key={type} value={type}>
                          {text}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid xs={1} item={true}>
              <div className="table-title table-top">기출여부</div>
            </Grid>
            <Grid xs={1} item={true}>
              <div className="table-content table-top">
                <FormControl className="table-select">
                  <Checkbox
                    checked={pastYn}
                    onChange={() => setPastYn(!pastYn)}
                    sx={{
                      color: "#ff8b2c",
                      "& .MuiSvgIcon-root": { fontSize: 28 },
                      "&.Mui-checked": {
                        color: "#ff8b2c",
                      },
                    }}
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid xs={1} item={true}>
              <div className="table-title table-top">발문</div>
            </Grid>
            <Grid xs={6} item={true}>
              <div className="table-content table-top">
                <FormControl className="table-input-select">
                  <TextField
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    label="교재명"
                    value={questionTitle}
                  />
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {["Q16", "Q17", "Q18", "Q21", "Q22"].includes(questionType) ? (
          <StyledTextarea
            ref={subBoxRef}
            minRows={5}
            maxRows={20}
            aria-label="maximum height"
            style={{ resize: "none", marginBottom: 10 }}
            placeholder={
              ["Q16", "Q17"].includes(questionType)
                ? "주어진 문장"
                : ["Q21", "Q22"].includes(questionType)
                ? "<보기>"
                : "요약문"
            }
            className="passage-text"
            onChange={(e) => setSubBox(e.target.value)}
          />
        ) : (
          <></>
        )}
        {questionType === "Q22" ? (
          <StyledTextarea
            ref={subBoxRef2}
            minRows={5}
            maxRows={20}
            aria-label="maximum height"
            style={{ resize: "none" }}
            placeholder={"<조건>"}
            className="passage-text"
            onChange={(e) => setSubBox2(e.target.value)}
          />
        ) : (
          <></>
        )}
      </div>
      <div style={{ display: "flex", gap: 30 }}>
        {questionType && !WRITE_TYPES.includes(questionType) ? (
          <div className="answer-wrap" style={{ width: 805, height: 262 }}>
            <ChooseDataGrid
              chooseRef={chooseRef}
              questionType={questionType}
              ref={chooseRef2}
            />
          </div>
        ) : (
          <></>
        )}

        <div
          className="answer-wrap"
          style={{
            width: 110,
            height: 262,
          }}
        >
          {!questionType ? (
            <></>
          ) : WRITE_TYPES.includes(questionType) ? (
            <div
              className="answer-wrap"
              style={{
                width: 950,
                height: 262,
              }}
            >
              <AnswerDataGrid
                questionType={questionType}
                answerRef={answerRef}
                ref={answerRef2}
              />
            </div>
          ) : (
            <div
              className="answer-wrap"
              style={{
                width: 110,
                height: 262,
              }}
            >
              <AnswerDataGrid
                questionType={questionType}
                answerRef={answerRef}
                ref={answerRef2}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default Question;
