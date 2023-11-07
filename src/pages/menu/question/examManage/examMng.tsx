import Layout from "@components/layouts/layout";
import CustomButton from "@components/ui/button/custeomButton";
import pdgImg from "@images/common/pdficon.png";
import {FormControl, TextField, Pagination, Button, Backdrop, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridColDef,
  MuiBaseEvent,
  MuiEvent,
  useGridApiRef,
} from "@mui/x-data-grid";
import * as React from "react";
import {useEffect, useRef, useReducer, useState} from "react";
import { $GET, $DELETE, $PUT } from "@utils/request";
import {alert} from "@utils/alert";
import {ALERT} from "@common/const";
import ExamView from "@pages/menu/question/examCreate/examView";
import NormalBook from "@pages/menu/question/examCreate/normalBook";
import BigBook from "@pages/menu/question/examCreate/bigBook";
import ReactToPrint from "react-to-print";
import axios from "axios";

const ExamMng = () => {
  const apiRef = useGridApiRef();
  const [searcText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = React.useState(0);
  const [rowData, setRowData] = useState<ExamBase>([])
  const [data, setData] = React.useState([] as any);
  const [able, setAble] = React.useState('')
  const [examTitle, setExamTitle] = useState('')
  const [header, setHeader] = useState('')
  const [leftBottom, setLeftBottom] = useState('')
  const [rightBottom, setRightBottom] = useState('')
  const [open, setOpen] = React.useState(false);
  const [any, forceUpdate] = useReducer((num) => num + 1, 0); // 컴포넌트 강제 랜더링을 위한 state

  useEffect(() => {
    console.log("effect!!");

    getExamList(0);
  }, []);

  const changePage = (pageNum: number) => {
    getExamList(pageNum);
  };

  const getExamList = (pageNum: number) => {
    const url = `/api/v1/exam/search?page=${pageNum}&size=10&examTitle=${searcText}`;

    setTimeout(() => {
      $GET(url, (res: any) => {
        let data = res.data.content;
        let newRows = [];
        for (let i = 0; i < data.length; i++) {
          newRows.push({
            id: i + 1,
            title: data[i].examTitle,
            createDate: data[i].createTime.split(" ")[0],
            downPdf: "",
            examId: data[i].examId,
          });
        }

        setData(newRows);
        setCount(res.data.totalPages);
        setPage(pageNum);
      });
    }, 5);
  };

  const textFieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchText(value);
  };

  const deleteExam = (examId: number) => {
    console.log(`${examId} api로 삭제 요청`);
    $DELETE(`/api/v1/exam/delete/${examId}`, (res: any) => {
      console.log("시험지 삭제 완료!");
      getExamList(page);
    });
  };

  const downPdf = async (examId:number,title:string) => {
    console.log(`${examId} api로 조회 요청`);
    let data:any
    const res = await axios.get(`http://43.201.142.170:29091/api/v1/exam/load/${examId}`)
    data=res.data
    await setAble(res.data.examFormat=='NORMAL'?'시험지':'BIGBOOK')
    await setRowData(data.examQuestions)
    await setExamTitle(data.title)
    await setHeader(data.subTitle)
    await setLeftBottom(data.leftFooter)
    await setRightBottom(data.rightFooter)

    alert.confirm({
      type: ALERT.CONFIRM,
      text: title+" 을(를) \n다운로드 하시겠습니까?\n\n",
      confirmText: "확인",
      confirmCall: async () => {
        setOpen(true)
        // setAble(data.examFormat=='NORMAL'?'시험지':'BIGBOOK')
        setTimeout(async ()=>{
          document.getElementById('print')!.click()
          setOpen(false)
        },2000)
      },
    });
    setOpen(false)
  };

  // 시험지 title 변경
  const titleEdit = (
    params: GridCellEditStopParams<any, any, any>,
    event: MuiEvent<MuiBaseEvent | any>
  ) => {
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      event.defaultMuiPrevented = true;
      return;
    }

    const { value: newTitle } = event.target;
    const { row: newExam, formattedValue } = params;

    if (formattedValue !== newTitle) {
      newExam.title = newTitle;
      console.log("타이틀 변경 요청", newExam);
      $PUT(
        "/api/v1/exam/change/title",
        {
          examId: newExam.examId,
          newTitle: newExam.title,
        },
        () => {
          getExamList(page);
        }
      );
    }
  };


  const downloadTrigger = () => {
    return <Button color="warning" variant="contained" size="large" className="examView_btn" id='print'>다운로드</Button>
  }

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 700,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable: false,
    },
    {
      field: "createDate",
      headerName: "제작일자",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "downPdf",
      headerName: "다운로드",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <img src={pdgImg} width={30} height={30} onClick={()=>downPdf(params.row.examId,params.row.title)}/>
      ),
    },
    {
      field: "examId",
      type: "actions",
      headerName: "삭제",
      width: 150,
      align: "center",
      headerAlign: "center",
      getActions: (params) => [
        <Button
          variant="outlined"
          color="warning"
          size="medium"
          onClick={() => deleteExam(params.row.examId)}
        >
          삭제
        </Button>,
      ],
    },
  ];

  return (
    <Layout>
      <div className="mainCont">
        <Typography
          variant="h2"
          className="menu-title"
          sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
        >
          시험지 관리
        </Typography>
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <TextField
            label="타이틀"
            variant="outlined"
            onChange={textFieldOnChange}
            onKeyUp={(e) => {
              if (e.key !== "Enter") return;
              getExamList(0);
            }}
            style={{ marginRight: "20px", width: "400px" }}
          >
            {searcText}
          </TextField>
          <span onClick={() => getExamList(0)}>
            <CustomButton type="string" label="검색" />
          </span>
        </div>
        <div>
          <DataGrid
            rows={data}
            columns={columns}
            sx={{ fontWeight: "500", fontSize: "15px" }}
            hideFooter={true}
            hideFooterPagination={true}
            onCellEditStop={(
              params: GridCellEditStopParams,
              event: MuiEvent<MuiBaseEvent | any>
            ) => {
              if (params.reason === GridCellEditStopReasons.enterKeyDown) {
                titleEdit(params, event);
              }
            }}
          />
          <Pagination
            count={count}
            onChange={(event, value) => changePage(value - 1)}
            page={page + 1}
            showFirstButton
            showLastButton
            shape="rounded"
            sx={{ display: "flex" }}
          />
        </div>
      </div>
      <div style={{right:'-1000px',position:'fixed',top:'100px'}}>
        {
          able == ''?
              <></>
              :able == '시험지'?
                  <NormalBook
                      pdfRef={ref}
                      rowData={rowData}
                      examTitle={examTitle}
                      header={header}
                      leftBottom={leftBottom}
                      rightBottom={rightBottom}
                      page={'manage'}
                  />
                  :
                  <BigBook
                      pdfRef={ref}
                      rowData={rowData}
                      examTitle={examTitle}
                      header={header}
                      leftBottom={leftBottom}
                      rightBottom={rightBottom}
                      page={'manage'}
                  />
        }
        <ReactToPrint
            trigger={downloadTrigger}
            content={() => ref.current}
            documentTitle={examTitle}
            // onBeforeGetContent={()=>console.log('프린트대기중')}
        />
      </div>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
};

export default ExamMng;
