import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Editor } from "@toast-ui/react-editor";
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
import { QUESTIONTYPE, DEFAULT_QUESTION, WRITE_TYPES } from "@common/const";
import QuestionList from "./questionList";
import {
  DataGrid,
  GridColDef,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  useGridApiRef,
} from "@mui/x-data-grid";
import { $POST } from "@utils/request";
import ChooseDataGrid from "./chooseDataGrid";
import { useLocation } from "react-router-dom";
import AnswerDataGrid from "./answerDataGrid";
import TuiEditor from "@components/ui/tui/toast";

const QuestionTab = () => {
  const [questionType, setQuestionType] = React.useState("");
  const [questionTitle, setQuestionTitle] = React.useState("");
  const [saveQuestions, setSaveQuestions] = React.useState([]);
  const [pastYn, setPastYn] = React.useState(false);
  const [subBox, setSubBox] = React.useState("");
  const [passageId, setPassageId] = React.useState(0);
  const passageDatas = useLocation().state;
  /* 
    {
        "passageYear": "2023",
        "passageNumber": "03",
        "passageId": 41,
        "passageUnit": "2과"
    },
    {
        "passageYear": "2023",
        "passageNumber": "1~12",
        "passageId": 8,
        "passageUnit": "1"
    },
    {
        "passageYear": "2023",
        "passageNumber": "01",
        "passageId": 30,
        "passageUnit": "1과"
    },
    {
        "passageYear": "2023",
        "passageNumber": "02",
        "passageId": 38,
        "passageUnit": "1과"
    }
] */

  const changeType = (e: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = e;
    setQuestionType(value as string);
    setQuestionTitle(DEFAULT_QUESTION[value]);
    answerRef2.current.resetWriteTypeRows();
  };

  const chooseRef = useGridApiRef();
  const chooseRef2 = React.useRef({
    getChooseList: () => [],
  });
  const answerRef = useGridApiRef();
  const answerRef2 = React.useRef({
    getAnswerList: () => [],
    resetWriteTypeRows: () => {},
  });

  const editorRef: React.MutableRefObject<any> = React.useRef();
  const tempSave = () => {
    const chooseList = chooseRef2.current.getChooseList();
    const answerList = answerRef2.current.getAnswerList();
    const questionContent = editorRef.current.getInstance().getHTML();
    console.log("answerList", answerList);
    console.log("chooseList", chooseList);

    const newQuestion = {
      passageId,
      questionContent,
      questionTitle,
      questionParams: [
        {
          questionSubTitle: questionTitle,
          pastYn,
          questionType,
          subBox,
          chooseList,
          answerList,
        },
      ],
    };

    // $POST("/api/v1/question/save", newQuestion, () => {
    //   setQuestionType("");
    //   setQuestionTitle("");
    //   setPastYn(false);
    //   setSubBox("");
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
            <div>
              {/*<Editor*/}
              {/*  ref={editorRef}*/}
              {/*  placeholder="내용을 입력해주세요."*/}
              {/*  previewStyle="vertical" // 미리보기 스타일 지정*/}
              {/*  height="300px" // 에디터 창 높이*/}
              {/*  initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)*/}
              {/*  toolbarItems={[*/}
              {/*    // 툴바 옵션 설정*/}
              {/*    ["heading", "bold", "italic", "strike"],*/}
              {/*    // ["hr", "quote"],*/}
              {/*    ["ul", "ol", "task", "indent", "outdent"],*/}
              {/*    ["table", "image", "link"],*/}
              {/*    // ["code", "codeblock"],*/}
              {/*  ]}*/}
              {/*></Editor>*/}
              <TuiEditor editorRef={editorRef}/>
            </div>
            <div style={{ display: "flex", gap: 30, marginTop: 10 }}>
              {questionType && !WRITE_TYPES.includes(questionType) ? (
                <div
                  className="answer-wrap"
                  style={{ width: 805, height: 262 }}
                >
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
                    <Button
                      sx={{
                        background: "#c9caca",
                        color: "white",
                      }}
                      size="large"
                      variant="contained"
                      // color="gray"
                      onClick={tempSave}
                    >
                      저장
                    </Button>
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
                    <Button
                      sx={{
                        background: "#c9caca",
                        color: "white",
                      }}
                      size="large"
                      variant="contained"
                      // color="gray"
                      onClick={tempSave}
                    >
                      저장
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <QuestionList
              width={250}
              height={300}
              rowData={passageDatas}
              setRowData={() => {}}
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
