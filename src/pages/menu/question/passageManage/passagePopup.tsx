import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { alert } from "@utils/alert";
import {
  ALERT,
  ANSWERCOLUMNS,
  DEFAULT_QUESTION,
  DEFAULTANSWERROWS,
  QUESTIONTYPE,
  WRITE_TYPES,
} from "@common/const";
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Typography from "@mui/material/Typography";
import VerticalTabs from "@pages/menu/question/passageManage/passageTabs";
import { $GET, $PUT } from "@utils/request";
import TuiEditor from "@components/ui/tui/toast";
import ChooseDataGrid from "@pages/menu/question/questionCreate/chooseDataGrid";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { StyledTextarea } from "@components/ui/text/textarea";
import AnswerDataGrid from "../questionCreate/answerDataGrid";

const PassagePopup = forwardRef(
  (props: { passageId: number | undefined }, ref: ForwardedRef<any>) => {
    const [parent, setParent] = useState({
      display: 0,
      callPassage: false,
      check: false,
      open: false,
      type: "",
      subType: "",
      pastYn: false,
      subPastYn: false,
      title: "",
      subTitle: "",
      content: "",
      questionContent: "",
      subContent: "",
      chooseList: [],
      answerList: [],
      questionId: 0,
      questionCode: "",
    });
    const editorRef: React.MutableRefObject<any> = React.useRef();
    const subBoxRef: React.MutableRefObject<any> = React.useRef();
    const subBoxRef2: React.MutableRefObject<any> = React.useRef();
    const chooseRef = useGridApiRef();
    const answerRef = useGridApiRef();
    const chooseRef2 = React.useRef({
      getChooseList: () => [],
    });
    const answerRef2 = React.useRef({
      getAnswerList: () => [],
      resetWriteTypeRows: () => {},
    });
    const [listData, setListData] = React.useState([]);
    const [content, setContent] = React.useState(parent.content);
    console.log("listData", listData);
    console.log("parent", parent);

    const changeType = (e: SelectChangeEvent<string>) => {
      const {
        target: { value },
      } = e;
      setParent((parent) => ({
        ...parent,
        type: value,
        title: DEFAULT_QUESTION[value],
      }));
    };

    const getPassageDatas = () => {
      $GET(`/api/v1/passage/search/${props.passageId}`, (res: any) => {
        res.data.questionInfo.forEach((Q: any) => {
          Q.question.forEach((q: any) => {
            q.answer.forEach((A: any) => (A.answerContent = A.content));
            q.choose.forEach((C: any) => (C.chooseContent = C.content));
          });
        });
        setListData(res.data.questionInfo);
        setParent((parent) => ({
          ...parent,
          content: res.data.passageContent,
          open: true,
        }));
      });
    };

    useEffect(() => {
      if (props.passageId != undefined) {
        getPassageDatas();
      }
    }, [parent.check]);

    const handleClose = () => {
      setParent((parent) => ({
        ...parent,
        content: "",
        subContent: "",
        questionContent: "",
        type: "",
        title: "",
        pastYn: false,
        callPassage: false,
        display: 0,
        open: false,
        subType: "",
        subPastYn: false,
        subTitle: "",
      }));
      setListData([]);
    };

    const handleOpen = () => {
      alert.confirm({
        type: ALERT.CONFIRM,
        text: "수정\n 하시겠습니까?\n\n",
        confirmText: "확인",
        confirmCall: () => {
          setParent((parent) => ({
            ...parent,
            check: !parent.check,
          }));
        },
      });
    };

    const getSubBoxContent = (type: string) => {
      return ["Q16", "Q17", "Q18", "Q21"].includes(type)
        ? subBoxRef.current.getInstance().getHTML()
        : ["Q22"].includes(type)
        ? subBoxRef.current.getInstance().getHTML() +
          "|" +
          subBoxRef2.current.getInstance().getHTML()
        : "";
    };

    const getUpdateParam = () => {
      return {
        questionCode: parent.questionCode,
        questionId: parent.questionId,
        passageId: props.passageId,
        questionContent: editorRef.current.getInstance().getHTML(),
        questionTitle: parent.title,
        questionSubTitle: parent.subTitle,
        pastYn: parent.pastYn,
        questionType: parent.type,
        subBox: getSubBoxContent(parent.type),
        chooseList:
          chooseRef2.current?.getChooseList().map((choose: any) => ({
            chooseSeq: choose.id,
            chooseContent: choose.chooseContent,
          })) ?? [],
        answerList:
          answerRef2.current
            ?.getAnswerList()
            .map((answer: any) => ({ answerContent: answer.answerContent })) ??
          [],
      } as any;
    };
    const updateFuntions = [
      // 지문 수정
      (callBack?: Function) => {
        // 바뀐게 없을때는 업데이트 안함
        if (content === parent.content) {
          return;
        }
        const param = {
          passageId: props.passageId,
          passageContent: content,
        };
        $PUT(`/api/v1/passage/update/content`, param, () => {
          if (callBack) {
            callBack();
          }
        });
      },
      // 복합문제 수정
      (callBack?: Function) => {
        const param = getUpdateParam();
        param.questionId = 0;

        $PUT(`/api/v1/question/update`, param, () => {
          setParent({
            ...parent,
            display: 0,
          });
          if (callBack) {
            callBack();
          }
        });
      },
      // 복합문제의 하위문제 수정
      (callBack?: Function) => {
        updateFuntions[1]();
        const param = getUpdateParam();
        param.questionType = parent.subType;
        param.pastYn = parent.subPastYn;
        param.subBox = getSubBoxContent(parent.subType);
        $PUT(`/api/v1/question/update`, param, () => {
          setParent({
            ...parent,
            display: 0,
          });
          if (callBack) {
            callBack();
          }
        });
      },
      // 단일문제 수정
      (callBack?: Function) => {
        const param = getUpdateParam();

        $PUT(`/api/v1/question/update`, param, () => {
          setParent({
            ...parent,
            display: 0,
          });
          if (callBack) {
            callBack();
          }
        });
      },
    ];
    const updateData = () => {
      if (parent.display === 0) {
        // 지문만 수정
        updateFuntions[0](getPassageDatas);
        return;
      }

      if (parent.callPassage) {
        updateFuntions[0]();
      }
      // 문제 수정
      updateFuntions[parent.display](getPassageDatas);
    };

    useImperativeHandle(ref, () => ({
      handleOpen,
    }));

    return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={parent.open}
      >
        <DialogTitle
          sx={{ margin: "10px 0 0 10px" }}
          id="customized-dialog-title"
        >
          <Typography
            component="div"
            variant="h3"
            sx={{ fontWeight: "bold", color: "#ff8b2c" }}
          >
            수정
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Button
            variant="outlined"
            color="warning"
            size="medium"
            className="popup-change"
            sx={{ margin: "0 50px 20px 0" }}
            onClick={updateData}
          >
            수정
          </Button>
          <Grid container>
            <Grid item lg={2}>
              <VerticalTabs
                parent={parent}
                setParent={setParent}
                data={listData}
                editor={editorRef}
                subBoxEditor1={subBoxRef}
                subBoxEditor2={subBoxRef2}
              />
            </Grid>
            <Grid item lg={10}>
              <Item style={{ height: "100%", padding: "20px" }}>
                {parent.callPassage && parent.display != 0 ? (
                  <StyledTextarea
                    minRows={10}
                    maxRows={10}
                    aria-label="maximum height"
                    placeholder="지문"
                    className="passage-text"
                    sx={{ resize: "none" }}
                    defaultValue={parent.content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                  />
                ) : (
                  <></>
                )}
                {parent.display == 0 ? (
                  <StyledTextarea
                    minRows={10}
                    maxRows={10}
                    aria-label="maximum height"
                    placeholder="지문"
                    className="passage-text"
                    sx={{ resize: "none" }}
                    defaultValue={parent.content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                  />
                ) : parent.display == 1 ? (
                  <>
                    <Grid container spacing={0} className="table-container">
                      <Grid xs={1} item={true}>
                        <div className="table-title table-top">유형</div>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <div className="table-content table-top">
                          <FormControl className="table-select">
                            <Select
                              value={parent.type}
                              defaultValue={"복합유형"}
                              onChange={changeType}
                              disabled={parent.type === "Q25"}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              {Object.entries(QUESTIONTYPE).map(
                                ([type, text]) => (
                                  <MenuItem key={type} value={type}>
                                    {text}
                                  </MenuItem>
                                )
                              )}
                            </Select>
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
                              onChange={(e) =>
                                setParent((parent) => ({
                                  ...parent,
                                  title: e.target.value,
                                }))
                              }
                              label="발문"
                              value={parent.title}
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                    <TuiEditor
                      content={parent.questionContent}
                      editorRef={editorRef}
                    />
                  </>
                ) : parent.display == 2 ? (
                  <>
                    <Grid container spacing={0} className="table-container">
                      <Grid xs={1} item={true}>
                        <div className="table-title table-top">유형</div>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <div className="table-content table-top">
                          <FormControl className="table-select">
                            <Select
                              value={parent.type}
                              defaultValue={"복합유형"}
                              onChange={changeType}
                              disabled={parent.type === "Q25"}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              {Object.entries(QUESTIONTYPE).map(
                                ([type, text]) => (
                                  <MenuItem key={type} value={type}>
                                    {text}
                                  </MenuItem>
                                )
                              )}
                            </Select>
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
                              onChange={(e) =>
                                setParent((parent) => ({
                                  ...parent,
                                  title: e.target.value,
                                }))
                              }
                              label="발문"
                              value={parent.title}
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                    <TuiEditor
                      content={parent.questionContent}
                      editorRef={editorRef}
                    />
                    <Grid container spacing={0} className="table-container">
                      <Grid xs={1} item={true}>
                        <div className="table-title table-top">유형</div>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <div className="table-content table-top">
                          <FormControl className="table-select">
                            <Select
                              value={parent.subType}
                              onChange={(e) => {
                                const {
                                  target: { value },
                                } = e;
                                setParent({
                                  ...parent,
                                  subType: value,
                                  subTitle: DEFAULT_QUESTION[value],
                                });
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              {Object.entries(QUESTIONTYPE)
                                .filter(([type, value]) => type !== "Q25")
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
                              checked={parent.subPastYn}
                              onChange={() =>
                                setParent((parent) => ({
                                  ...parent,
                                  subPastYn: !parent.subPastYn,
                                }))
                              }
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
                              onChange={(e) =>
                                setParent((parent) => ({
                                  ...parent,
                                  subTitle: e.target.value,
                                }))
                              }
                              label="발문"
                              value={parent.subTitle}
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {["Q16", "Q17", "Q18", "Q21", "Q22"].includes(
                        parent.subType
                      ) ? (
                        <TuiEditor
                          editorRef={subBoxRef}
                          height="200px"
                          placeholder={
                            ["Q16", "Q17"].includes(parent.subType)
                              ? "<주어진 문장>"
                              : ["Q21", "Q22"].includes(parent.subType)
                              ? "<보기>"
                              : "<요약문>"
                          }
                          content={parent.subContent.split("|")[0]}
                        />
                      ) : (
                        <></>
                      )}
                      {parent.subType === "Q22" ? (
                        <TuiEditor
                          editorRef={subBoxRef2}
                          height="200px"
                          placeholder={"<조건>"}
                          content={parent.subContent.split("|")[1]}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <Grid container>
                      <Grid
                        item
                        lg={WRITE_TYPES.includes(parent.subType) ? 0 : 10.5}
                      >
                        <ChooseDataGrid
                          chooseRef={chooseRef}
                          ref={chooseRef2}
                          chooseList={parent.chooseList}
                          questionType={parent.subType}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={WRITE_TYPES.includes(parent.subType) ? 12 : 1.5}
                      >
                        <div className={`answer-wrap-${parent.questionId}`}>
                          <AnswerDataGrid
                            answerRef={answerRef}
                            ref={answerRef2}
                            questionType={parent.subType}
                            answerList={parent.answerList}
                            id={parent.questionId}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid container spacing={0} className="table-container">
                      <Grid xs={1} item={true}>
                        <div className="table-title table-top">유형</div>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <div className="table-content table-top">
                          <FormControl className="table-select">
                            <Select
                              value={parent.type}
                              onChange={changeType}
                              displayEmpty
                              disabled={parent.type === "Q25"}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              {Object.entries(QUESTIONTYPE).map(
                                ([type, text]) => (
                                  <MenuItem key={type} value={type}>
                                    {text}
                                  </MenuItem>
                                )
                              )}
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
                              checked={parent.pastYn}
                              onChange={() =>
                                setParent((parent) => ({
                                  ...parent,
                                  pastYn: !parent.pastYn,
                                }))
                              }
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
                              onChange={(e) =>
                                setParent((parent) => ({
                                  ...parent,
                                  title: e.target.value,
                                }))
                              }
                              label="발문"
                              value={parent.title}
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                    <TuiEditor
                      content={parent.questionContent}
                      editorRef={editorRef}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {["Q16", "Q17", "Q18", "Q21", "Q22"].includes(
                        parent.type
                      ) ? (
                        <TuiEditor
                          editorRef={subBoxRef}
                          height="200px"
                          placeholder={
                            ["Q16", "Q17"].includes(parent.type)
                              ? "<주어진 문장>"
                              : ["Q21", "Q22"].includes(parent.type)
                              ? "<보기>"
                              : "<요약문>"
                          }
                          content={parent.subContent.split("|")[0]}
                        />
                      ) : (
                        <></>
                      )}
                      {parent.type === "Q22" ? (
                        <TuiEditor
                          editorRef={subBoxRef2}
                          height="200px"
                          placeholder={"<조건>"}
                          content={parent.subContent.split("|")[1]}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <Grid container>
                      <Grid
                        item
                        lg={WRITE_TYPES.includes(parent.type) ? 0 : 10.5}
                      >
                        <ChooseDataGrid
                          chooseRef={chooseRef}
                          ref={chooseRef2}
                          chooseList={parent.chooseList}
                          questionType={parent.type}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={WRITE_TYPES.includes(parent.type) ? 12 : 1.5}
                      >
                        <div className={`answer-wrap-${parent.questionId}`}>
                          <AnswerDataGrid
                            answerRef={answerRef}
                            ref={answerRef2}
                            questionType={parent.type}
                            answerList={parent.answerList}
                            id={parent.questionId}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Item>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    );
  }
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default PassagePopup;
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "600px",
  lineHeight: "60px",
  width: "90%",
  margin: "0 auto",
}));
