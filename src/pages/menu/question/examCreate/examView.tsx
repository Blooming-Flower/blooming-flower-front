import Typography from "@mui/material/Typography";
import * as React from "react";
import Layout from "@components/layouts/layout";
import "@css/pdf.scss";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import { EXAMTYPE, URL } from "@common/const";
import MenuIcon from "@mui/icons-material/Menu";
import CustomButton from "@components/ui/button/custeomButton";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import NormalBook from "@pages/menu/question/examCreate/normalBook";
import BigBook from "@pages/menu/question/examCreate/bigBook";
import { useLocation } from "react-router-dom";
import { $GET, $POST } from "@utils/request";
import ReactToPrint from "react-to-print";
import axios from "axios";

const ExamView = () => {
  const props = useLocation().state;
  const [able, setAble] = useState("");
  const [rowData, setRowData] = useState<ExamBase>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const call = async () => {
    for (let i = 0; i < props.length; i++) {
      const res = await axios.get(
        `${URL.SERVER_URL}/api/v1/exam/search/questions/` +
          props[i].questionIds.toString()
      );
      for (let j = 0; j < res.data.length; j++) {
        props[i].questionInfo = res.data[j].questionInfo;
        props[i].questionCnt = 0;

        for (let k = 0; k < res.data[j].questionInfo.length; k++) {
          props[i].questionCnt += res.data[j].questionInfo[k].question.length;
        }
      }
    }

    // 지문으로 묶여 있는 것을 문제별로 쪼개기
    const set = new Set();
    const tempArr = props.reduce((acc: any[], cur: any) => {
      cur.questionInfo.forEach((Q: any) => {
        const temp = {
          ...cur,
          count: 0,
          questionCnt: 0,
          questionIds: [],
          questionInfo: [],
        };
        temp.questionInfo.push({ ...Q });
        Q.question.forEach((q: any) => temp.questionIds.push(q.questionId));
        temp.count = temp.questionIds.length;
        temp.questionCnt = temp.questionIds.length;

        acc.push(temp);
      });
      return acc;
    }, []);

    // 랜덤으로 섞기
    const arr = [];
    while (set.size != tempArr.length) {
      const idx = Math.floor(Math.random() * tempArr.length);
      if (set.has(idx)) continue;
      set.add(idx);
      arr.push(tempArr[idx]);
    }
    await setRowData(arr);
    setAble("시험지");
  };
  useEffect(() => {
    setOpen(true);
    call();
    setOpen(false);
  }, []);
  const [examTitle, setExamTitle] = useState("");
  const [header, setHeader] = useState("");
  const [leftBottom, setLeftBottom] = useState("");
  const [rightBottom, setRightBottom] = useState("");

  //시험지종류 체크
  const handleClick = (type: string) => {
    switch (type) {
      case "시험지":
        break;
      case "Big Book":
        break;
    }
    setAble(type);
  };

  //Drag-End이벤트
  const handleChange = (result: any) => {
    if (!result.destination) return;
    console.log(result);
    const items = [...rowData];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setRowData(items);
    console.log(items);
  };

  //프린트 After 이벤트
  const onAfterPrint = () => {
    let param: { questionId: number; groupSeq: number; groupName: string }[] =
      [];
    for (let i = 0; i < rowData.length; i++) {
      console.log(rowData[i]);
      for (let j = 0; j < rowData[i].questionIds.length; j++) {
        param.push({
          questionId: rowData[i].questionIds[j],
          groupSeq: i,
          groupName: rowData[i].passageName,
        });
      }
    }
    console.log(param);
    console.log("저장후 이벤트");
    $POST(
      "/api/v1/exam/make",
      {
        title: examTitle,
        subTitle: header,
        leftFooter: leftBottom,
        rightFooter: rightBottom,
        examFormat: able == "시험지" ? "NORMAL" : "BIGBOOK",
        questionParams: param,
      },
      (res: any) => {
        console.log(res);
      }
    );
  };

  const downloadTrigger = () => {
    return (
      <Button
        color="warning"
        variant="contained"
        size="large"
        className="examView_btn"
      >
        다운로드
      </Button>
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
          시험지제작
        </Typography>
        <Box sx={{ width: "100%", height: "40px" }}>
          <div>
            <Typography variant="h5" className="button-front">
              종류
            </Typography>
          </div>
          {EXAMTYPE.map((text, id) => (
            <div
              key={id}
              onClick={() => handleClick(text)}
              className="button-label"
            >
              <CustomButton label={text} type={able} borderType={"round"} />
            </div>
          ))}
        </Box>
        <div className="grid-flex">
          <div className="css-with80" style={{ width: "75%" }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%", paddingBottom: "40px" }}>
                <Box>
                  <Grid container spacing={0} className="table-container">
                    <Grid xs={1.5} item={true}>
                      <div className="table-title table-top">시험지Title</div>
                    </Grid>
                    <Grid xs={10.5} item={true}>
                      <div className="table-content table-top">
                        <FormControl className="table-input-select">
                          <TextField
                            onChange={(e) => setExamTitle(e.target.value)}
                            label="Title을 입력하세요."
                            value={examTitle}
                          />
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid xs={1.5} item={true}>
                      <div className="table-title">머리말</div>
                    </Grid>
                    <Grid xs={4.5} item={true}>
                      <div className="table-content">
                        <FormControl className="table-input-select">
                          <TextField
                            onChange={(e) => setHeader(e.target.value)}
                            label="머리말을 입력하세요."
                            value={header}
                          />
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid xs={1.5} item={true}>
                      <div className="table-title">꼬리말</div>
                    </Grid>
                    <Grid xs={4.5} item={true}>
                      <div className="table-content">
                        <Grid container>
                          <Grid
                            item
                            xs={1}
                            style={{ textAlign: "center", display: "flex" }}
                          >
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "10px",
                              }}
                            >
                              (왼)
                            </p>
                          </Grid>
                          <Grid item xs={5}>
                            <FormControl className="table-input-select">
                              <TextField
                                onChange={(e) => setLeftBottom(e.target.value)}
                                label="왼쪽"
                                value={leftBottom}
                              />
                            </FormControl>
                          </Grid>
                          <Grid
                            item
                            xs={1}
                            style={{ textAlign: "center", display: "flex" }}
                          >
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "10px",
                              }}
                            >
                              (오)
                            </p>
                          </Grid>
                          <Grid item xs={5}>
                            <FormControl className="table-input-select">
                              <TextField
                                onChange={(e) => setRightBottom(e.target.value)}
                                label="오른쪽"
                                value={rightBottom}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Paper
                className="div_container"
                elevation={4}
                style={{ backgroundColor: "#a4a4a4" }}
                id="div_container"
              >
                {able == "" ? (
                  <></>
                ) : able == "시험지" ? (
                  <NormalBook
                    pdfRef={ref}
                    rowData={rowData}
                    examTitle={examTitle}
                    header={header}
                    leftBottom={leftBottom}
                    rightBottom={rightBottom}
                    page={""}
                  />
                ) : (
                  <BigBook
                    pdfRef={ref}
                    rowData={rowData}
                    examTitle={examTitle}
                    header={header}
                    leftBottom={leftBottom}
                    rightBottom={rightBottom}
                    page={""}
                  />
                )}
              </Paper>
            </Box>
          </div>
          <div className="css-margin-left100 examView">
            <div className="questionList-item">
              <DragDropContext onDragEnd={handleChange}>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <List
                      className="todos"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        width: 380,
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        height: "640px",
                        "& ul": { padding: 0 },
                        paddingRight: "10px",
                      }}
                    >
                      {rowData.map(
                        (
                          {
                            passageId,
                            passageYear,
                            passageName,
                            passageUnit,
                            passageNumber,
                            questionCnt,
                          },
                          index
                        ) => (
                          <Draggable
                            key={passageId}
                            draggableId={passageId.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <>
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                      <MenuIcon />
                                    </IconButton>
                                  }
                                >
                                  {/*<div>{passageYear}</div>*/}
                                  <div
                                    className="passageName"
                                    style={{
                                      // maxWidth: 65,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                    data-tooltip={passageName}
                                  >
                                    {passageName}
                                  </div>
                                  <div>{passageUnit}</div>
                                  <div>{passageNumber}</div>
                                  <div>{questionCnt}</div>
                                </ListItem>
                                <Divider />
                              </>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <ReactToPrint
              trigger={downloadTrigger}
              content={() => ref.current}
              documentTitle={examTitle}
              // onBeforeGetContent={()=>console.log('프린트대기중')}
              onAfterPrint={onAfterPrint}
            />
            {/*    color="warning"*/}
            {/*    size="large"*/}
            {/*    variant="contained"*/}
            {/*    onClick={handlePreview}*/}
            {/*    sx={{ height: "40px", borderRadius: "20px", fontSize: "15px", width:'300px' }}*/}
            {/*>*/}
            {/*    미리보기*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
};
export default ExamView;
