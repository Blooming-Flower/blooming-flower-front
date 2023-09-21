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
} from "@mui/material";
import { QUESTIONTYPE, DEFAULT_QUESTION } from "@common/const";
import QuestionList from "./questionList";
import {
  DataGrid,
  GridColDef,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  useGridApiRef,
} from "@mui/x-data-grid";
import { log } from "console";

const QuestionTab = () => {
  const [questionType, setQuestionType] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");

  const changeType = (e: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = e;
    setQuestionType(value as string);
    setQuestionText(DEFAULT_QUESTION[value]);
  };

  const columns: GridColDef[] = [
    {
      field: "chooseSeq",
      headerName: "선지번호",
      width: 30,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "chooseContent",
      headerName: "선지내용",
      width: 750,
      align: "left",
      headerAlign: "center",
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      chooseSeq: "①",
      chooseContent: "",
    },
    {
      id: 2,
      chooseSeq: "②",
      chooseContent: "",
    },
    {
      id: 3,
      chooseSeq: "③",
      chooseContent: "",
    },
    {
      id: 4,
      chooseSeq: "④",
      chooseContent: "",
    },
    {
      id: 5,
      chooseSeq: "⑤",
      chooseContent: "",
    },
  ];

  const answerColunms: GridColDef[] = [
    {
      field: "chooseSeq",
      headerName: "선지번호",
      width: 30,
      align: "center",
      headerAlign: "center",
    },
    {
      // field: "answerContent",
      // headerName: "",
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 30,
      // align: "center",
      // headerAlign: "center",
      // type: "check",
    },
  ];
  const answerRows = [
    {
      id: 1,
      chooseSeq: "①",
      answerContent: "",
    },
    {
      id: 2,
      chooseSeq: "②",
      answerContent: "",
    },
    {
      id: 3,
      chooseSeq: "③",
      answerContent: "",
    },
    {
      id: 4,
      chooseSeq: "④",
      answerContent: "",
    },
    {
      id: 5,
      chooseSeq: "⑤",
      answerContent: "",
    },
  ];

  const chooseRef = useGridApiRef();
  const answerRef = useGridApiRef();
  const editorRef: React.MutableRefObject<any> = React.useRef();

  const tempSave = () => {
    const chooseData = chooseRef.current
      .getAllRowIds()
      .map((id) => chooseRef.current.getRow(id))
      .map(({ id: chooseSeq, chooseContent }) => {
        return { chooseSeq, chooseContent };
      });
    const answerData = [...answerRef.current.getSelectedRows().keys()];
    const questionContent = editorRef.current.getInstance().getHTML();

    console.log(chooseData);
    console.log(answerData);
    console.log(questionContent);

    // questionType
    // questionText
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
              <Grid xs={2} item={true}>
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
              <Grid xs={2} item={true}>
                <div className="table-title table-top">발문</div>
              </Grid>
              <Grid xs={6} item={true}>
                <div className="table-content table-top">
                  <FormControl className="table-input-select">
                    <TextField
                      onChange={(e) => setQuestionText(e.target.value)}
                      label="교재명"
                      value={questionText}
                    />
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <div>
              <Editor
                ref={editorRef}
                placeholder="내용을 입력해주세요."
                previewStyle="vertical" // 미리보기 스타일 지정
                height="300px" // 에디터 창 높이
                initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "image", "link"],
                  // ["code", "codeblock"],
                ]}
              ></Editor>
            </div>
            <div style={{ display: "flex", gap: 30, marginTop: 10 }}>
              <div className="answer-wrap" style={{ width: 805, height: 262 }}>
                <DataGrid
                  apiRef={chooseRef}
                  rows={rows}
                  columns={columns}
                  slots={{ columnHeaders: () => null }}
                  hideFooter={true}
                  hideFooterPagination={true}
                  hideFooterSelectedRowCount={true}
                />
              </div>
              <div className="answer-wrap" style={{ width: 110, height: 262 }}>
                <DataGrid
                  apiRef={answerRef}
                  rows={answerRows}
                  columns={answerColunms}
                  slots={{ columnHeaders: () => null }}
                  hideFooter={true}
                  hideFooterPagination={true}
                  hideFooterSelectedRowCount={true}
                  checkboxSelection
                  sx={{ marginBottom: 1 }}
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
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <QuestionList width={250} height={300} />
            <QuestionList width={250} height={300} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionTab;
