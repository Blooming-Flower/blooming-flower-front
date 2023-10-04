import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@css/questionTab/questionTab.scss";
import {
  FormControl,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import { QUESTIONTYPE, DEFAULT_QUESTION } from "@common/const";
import QuestionList from "./questionList";
import { $POST } from "@utils/request";
import { useLocation } from "react-router-dom";
import TuiEditor from "@components/ui/tui/toast";
import Question from "./question";

const QuestionTab = () => {
  const [questionType, setQuestionType] = React.useState("");
  const [questionTitle, setQuestionTitle] = React.useState("");
  const [saveQuestions, setSaveQuestions] = React.useState([]);
  const [pastYn, setPastYn] = React.useState(false);
  const [questionParamList, setQuestionParamList] = React.useState([0]);
  const [passageId, setPassageId] = React.useState(0);
  const passageDatas = useLocation().state;
  const defaultQuestionRefList = Array.from({ length: 5 }, (el) =>
    React.useRef({
      getQuestionParams: (): any => {
        return {};
      },
      changeQuestionType: (newType: string) => {},
    })
  );

  console.log(passageDatas);

  const changeType = (e: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = e;
    setQuestionType(value as string);
    setQuestionTitle(DEFAULT_QUESTION[value]);
    // answerRef2.current.resetWriteTypeRows();
    setQuestionParamList([0]);
    questionParamList.forEach((idx) =>
      defaultQuestionRefList[idx].current.changeQuestionType(value)
    );
  };

  const editorRef: React.MutableRefObject<any> = React.useRef();
  const questionSave = () => {
    const questionContent = editorRef.current.getInstance().getHTML();

    const newQuestion = {
      passageId,
      questionContent,
      questionTitle,
      questionParams: questionParamList.map((idx) =>
        defaultQuestionRefList[idx].current.getQuestionParams()
      ),
    };

    if (questionType !== "Q25") {
      const {
        questionParams: [questionParam],
      } = newQuestion;
      questionParam.pastYn = pastYn;
    }

    console.log(newQuestion);

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
  };

  return (
    <Layout>
      <div className="mainCont">
        <Typography
          variant="h2"
          className="menu-title"
          sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
        >
          문제출제
        </Typography>
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ width: 950 }}>
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
                      {Object.entries(QUESTIONTYPE).map(([type, text]) => (
                        <MenuItem key={type} value={type}>
                          {text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              {questionType === "Q25" ? (
                <></>
              ) : (
                <>
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
                </>
              )}
              <Grid xs={1} item={true}>
                <div className="table-title table-top">발문</div>
              </Grid>
              <Grid xs={6} item={true}>
                <div className="table-content table-top">
                  <FormControl className="table-input-select">
                    <TextField
                      onChange={(e) => setQuestionTitle(e.target.value)}
                      label="발문"
                      value={questionTitle}
                    />
                  </FormControl>
                </div>
              </Grid>
              {questionType === "Q25" ? (
                <>
                  <Grid xs={1} item={true}>
                    <div className="table-title table-top">문제수</div>
                  </Grid>
                  <Grid xs={1} item={true}>
                    <div className="table-content table-top">
                      <FormControl className="table-select">
                        <Select
                          value={questionParamList.length}
                          onChange={(e) => {
                            const newList = Array.from(
                              { length: Number(e.target.value) },
                              (el, idx) => idx
                            );
                            setQuestionParamList(newList);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <div>
              <TuiEditor editorRef={editorRef} />
            </div>
            {!questionType ? (
              <></>
            ) : questionParamList.length ? (
              questionParamList.map((idx) => (
                <Question
                  questionType={questionType}
                  ref={defaultQuestionRefList[idx]}
                  key={idx}
                />
              ))
            ) : (
              <Question
                questionType={questionType}
                ref={defaultQuestionRefList[0]}
                key={0}
              />
            )}
            {questionType ? (
              <Button
                sx={{
                  background: "#c9caca",
                  color: "white",
                }}
                size="large"
                variant="contained"
                // color="gray"
                onClick={questionSave}
              >
                저장
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <QuestionList
              width={250}
              height={300}
              rowData={passageDatas}
              setRowData={() => {}}
              editorRef={editorRef}
            />
            <QuestionList
              width={250}
              height={300}
              rowData={saveQuestions}
              setRowData={setSaveQuestions}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionTab;
