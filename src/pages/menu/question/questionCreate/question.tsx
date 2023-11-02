import {
  ABC_TYPES,
  AB_TYPES,
  DEFAULT_QUESTION,
  QUESTIONTYPE,
  WRITE_TYPES,
} from "@common/const";
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
import TuiEditor from "@components/ui/tui/toast";

const Question = React.forwardRef(
  (props: { questionType: string; questionParam?: any; id: number }, ref) => {
    const {
      questionType: propsQuestionType,
      questionSubTitle: propsQuestionSubTitle,
      pastYn: propsPastYn,
      subBox: propsSubBox,
      chooseList: propsChoosList,
      answerList: propsAnswerList,
    } = props.questionParam ?? "";

    const subBoxs = propsSubBox?.split("|") ?? "";

    const [questionType, setQuestionType] = React.useState(
      ["Q25", ""].includes(props.questionType)
        ? props.questionParam?.questionType ?? "Q1"
        : props.questionType
    );
    const [questionTitle, setQuestionTitle] = React.useState(
      DEFAULT_QUESTION[
        ["Q25", ""].includes(props.questionType) ? "Q1" : props.questionType
      ]
    );

    const [pastYn, setPastYn] = React.useState(propsPastYn ?? false);
    const [chooseList, setChooseList] = React.useState(propsChoosList);
    const [answerList, setAnswerList] = React.useState(propsAnswerList);

    React.useEffect(() => {
      setQuestionType(
        ["Q25", ""].includes(props.questionType)
          ? props.questionParam?.questionType ?? "Q1"
          : props.questionType
      );
      setQuestionTitle(
        DEFAULT_QUESTION[
          ["Q25", ""].includes(props.questionType) ? "Q1" : props.questionType
        ]
      );
      setChooseList(propsChoosList);
      setAnswerList(propsAnswerList);
    }, [props, props.questionType, props.questionParam]);

    React.useImperativeHandle(ref, () => ({
      getQuestionParams: () => {
        if (props.questionType === "Q25") {
          return {
            questionSubTitle: questionTitle,
            pastYn,
            questionType,
            subBox: getSubBoxContent(),
            chooseList: chooseRef2.current?.getChooseList() ?? [],
            answerList: answerRef2.current.getAnswerList() ?? [],
          };
        }
        return {
          pastYn: false,
          questionType,
          subBox: getSubBoxContent(),
          chooseList: chooseRef2.current?.getChooseList() ?? [],
          answerList: answerRef2.current.getAnswerList() ?? [],
        };
      },
      changeQuestionType: (newType: string) => {
        changeType(newType);
      },
    }));

    const getSubBoxContent = () => {
      return ["Q16", "Q17", "Q18", "Q21"].includes(questionType)
        ? subBoxRef.current.getInstance().getHTML()
        : ["Q22"].includes(questionType)
        ? subBoxRef.current.getInstance().getHTML() +
          "|" +
          subBoxRef2.current.getInstance().getHTML()
        : "";
    };

    const subBoxRef: React.MutableRefObject<any> = React.useRef();
    const subBoxRef2: React.MutableRefObject<any> = React.useRef();
    const chooseRef = useGridApiRef();
    const chooseRef2 = React.useRef({
      getChooseList: () => [],
    });
    const answerRef = useGridApiRef();
    const answerRef2 = React.useRef({
      getAnswerList: () => [],
      resetWriteTypeRows: () => {},
    });

    const changeType = (e: SelectChangeEvent<string> | string) => {
      answerRef2.current.resetWriteTypeRows();
      if (typeof e === "string") {
        setQuestionType(e);
        setQuestionTitle(DEFAULT_QUESTION[e]);
        return;
      }
      const {
        target: { value },
      } = e;
      setQuestionType(value as string);
      setQuestionTitle(DEFAULT_QUESTION[value]);
    };

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
                      label="발문"
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
            <TuiEditor
              editorRef={subBoxRef}
              height="200px"
              placeholder={
                ["Q16", "Q17"].includes(questionType)
                  ? "<주어진 문장>"
                  : ["Q21", "Q22"].includes(questionType)
                  ? "<보기>"
                  : "<요약문>"
              }
              content={subBoxs[0]}
            />
          ) : (
            <></>
          )}
          {questionType === "Q22" ? (
            <TuiEditor
              editorRef={subBoxRef2}
              height="200px"
              placeholder={"<조건>"}
              content={subBoxs[1]}
            />
          ) : (
            <></>
          )}
        </div>
        <div style={{ display: "flex", gap: 30 }}>
          {questionType && !WRITE_TYPES.includes(questionType) ? (
            <div
              className="answer-wrap"
              style={{
                width: 860,
                height:
                  ABC_TYPES.includes(questionType) ||
                  AB_TYPES.includes(questionType)
                    ? 318
                    : 262,
              }}
            >
              <ChooseDataGrid
                chooseRef={chooseRef}
                questionType={questionType}
                ref={chooseRef2}
                chooseList={chooseList}
              />
            </div>
          ) : (
            <></>
          )}

          <div
            className={`answer-wrap-${props.id}`}
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
                  width: 1000,
                  height: 262,
                }}
              >
                <AnswerDataGrid
                  questionType={questionType}
                  answerRef={answerRef}
                  ref={answerRef2}
                  id={props.id}
                  answerList={answerList}
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
                  id={props.id}
                  answerList={answerList}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default Question;
