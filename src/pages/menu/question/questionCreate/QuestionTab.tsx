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
  Alert,
} from "@mui/material";
import { QUESTIONTYPE, DEFAULT_QUESTION } from "@common/const";
import QuestionList from "./questionList";
import { useLocation } from "react-router-dom";
import TuiEditor from "@components/ui/tui/toast";
import Question from "./question";
import TempSaveQuestionList from "./tempSaveQuestionList";
import { $GET } from "@utils/request";

const QuestionTab = () => {
  const [questionType, setQuestionType] = React.useState("");
  const [questionTitle, setQuestionTitle] = React.useState("");
  const [pastYn, setPastYn] = React.useState(false);
  const [questionParamList, setQuestionParamList] = React.useState([0]);
  const [passageData, setPassageData] = React.useState<any>({});
  const passageDatas = useLocation().state;
  const [isModifyTempSave, setIsModifyTempSave] = React.useState(false);
  const defaultQuestionRefList = Array.from({ length: 5 }, (el) =>
    React.useRef({
      getQuestionParams: (): any => {
        return {};
      },
      changeQuestionType: (newType: string) => {},
    })
  );
  const [tempSaveList, setTempSaveList] = React.useState<any[]>([]);
  const [modifyingTempSaveIdx, setModifyingTempSaveIdx] = React.useState(0);

  const changeType = (e: SelectChangeEvent<string>, isReset: boolean) => {
    const {
      target: { value },
    } = e;
    setQuestionType(value as string);
    setQuestionTitle(DEFAULT_QUESTION[value] ?? "");
    setQuestionParamList([0]);
    questionParamList.forEach((idx) =>
      defaultQuestionRefList[idx].current?.changeQuestionType(value)
    );
    if (isReset) {
      editorRef.current.setHTML("");
    }
  };

  const editorRef: React.MutableRefObject<any> = React.useRef();
  const questionTempSave = () => {
    if (JSON.stringify(passageData) === "{}") {
      alert("지문을 골라주세요.");
      return;
    }
    const questionContent = editorRef.current.getInstance().getHTML();

    const newQuestion = {
      questionContent,
      questionTitle,
      passageData,
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

    if (isModifyTempSave) {
      tempSaveList[modifyingTempSaveIdx] = newQuestion;
      setTempSaveList([...tempSaveList]);
    } else {
      setTempSaveList([...tempSaveList, newQuestion]);
    }

    setQuestionType("");
    setQuestionTitle("");
    setPastYn(false);
    editorRef.current.getInstance().setHTML("");
  };

  const onClinkPassageListItem = (_passageData: any) => {
    $GET(`/api/v1/passage/search/${_passageData.passageId}`, (result: any) => {
      editorRef.current.getInstance().setHTML(result.data.passageContent);
      setPassageData({ ..._passageData });
      if (isModifyTempSave) {
        setIsModifyTempSave(false);
        setQuestionTitle("");
        setQuestionType("");
        setPastYn(false);
      }
    });
  };

  const onClickTempSaveListItem = (rowData: any, idx: number) => {
    const { questionContent, questionParams, questionTitle } =
      tempSaveList[idx];
    setModifyingTempSaveIdx(idx);
    setIsModifyTempSave(true);
    editorRef.current.getInstance().setHTML(questionContent);
    if (questionParams.length > 1) {
      setQuestionType("Q25");
      // setQuestionParamList(
      //   Array.from({ length: questionParams.length }, (acc, idx) => idx)
      // );
    } else {
      setQuestionType(questionParams[0].questionType);
      setPastYn(questionParams[0].pastYn);
    }
    setQuestionTitle(questionTitle);
    setPassageData(rowData);
    setQuestionParamList(
      Array.from({ length: questionParams.length }, (cur, idx) => idx)
    );
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
                      onChange={(e) => changeType(e, false)}
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
                  id={idx}
                  questionParam={
                    isModifyTempSave
                      ? tempSaveList[modifyingTempSaveIdx]?.questionParams[
                          idx
                        ] ?? null
                      : null
                  }
                />
              ))
            ) : (
              <Question
                questionType={questionType}
                ref={defaultQuestionRefList[0]}
                id={0}
                questionParam={
                  isModifyTempSave
                    ? tempSaveList[modifyingTempSaveIdx].questionParams[0]
                    : null
                }
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
                onClick={questionTempSave}
              >
                담기
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
              width: 300,
            }}
          >
            <QuestionList
              width={250}
              height={300}
              rowData={passageDatas}
              setRowData={() => {}}
              editorRef={editorRef}
              onClickListItem={onClinkPassageListItem}
              setPassageData={setPassageData}
              setIsModifyTempSave={setIsModifyTempSave}
            />
            <TempSaveQuestionList
              width={300}
              height={300}
              rowData={tempSaveList}
              editorRef={editorRef}
              setRowData={setTempSaveList}
              onClickListItem={onClickTempSaveListItem}
              changeType={changeType}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionTab;
