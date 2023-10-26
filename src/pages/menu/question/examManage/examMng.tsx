import Layout from "@components/layouts/layout";
import CustomButton from "@components/ui/button/custeomButton";
import pdgImg from "@images/common/pdficon.png";
import { FormControl, TextField, Pagination, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomNoRowsOverlay from "@components/ui/grid/customNoGrid";
import customPagination from "@components/ui/grid/customPage";
import {
  DataGrid,
  GridCallbackDetails,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridColDef,
  GridRowParams,
  MuiBaseEvent,
  MuiEvent,
  useGridApiRef,
} from "@mui/x-data-grid";
import { log } from "console";
import * as React from "react";
import { useEffect, useRef, useReducer } from "react";
import { $GET } from "@utils/request";
// import pdfSvg from "/src/assets/svg/pdfSvg.svg";

const ExamMng = () => {
  const apiRef = useGridApiRef();
  const [searcText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState([] as any);
  const [any, forceUpdate] = useReducer((num) => num + 1, 0); // 컴포넌트 강제 랜더링을 위한 state

  useEffect(() => {
    console.log("effect!!")

    getExamList(0);

  }, []);

  const changePage = (pageNum: number) => {
    getExamList(pageNum);
  };

  const getExamList = (pageNum: number) => {
    let baseUrl = `/api/v1/exam/search?page=${pageNum}&size=5`;

    let uri = searcText ? baseUrl + "&examTitle=" + searcText : baseUrl;

    setTimeout(() => {
      $GET(
        uri,
        (res: any) => {
          let data = res.data.content;
          let newRows = [];
          for (let i = 0; i < data.length; i++) {
            newRows.push({
              id: i + 1,
              title: data[i].examTitle,
              createDate: data[i].createTime.split(" ")[0],
              downPdf: "",
              examId: data[i].examId
            });
          }

          setData(newRows);
          setCount(res.data.totalPages);
          setPage(pageNum);
        }
      );
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

  const deleteExam = () => {
    console.log("api로 삭제 요청");
  };

  const downPdf = () => {
    console.log("pdf 다운도르");
  };


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
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 700,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "createDate",
      headerName: "제작일자",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "downPdf",
      headerName: "다운로드",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: () => (
        <img src={pdgImg} width={30} height={30} onClick={downPdf} />
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
          onClick={() => deleteExam()}
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
          시험지관리
        </Typography>
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <TextField
            label="타이틀"
            variant="outlined"
            onChange={textFieldOnChange}
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
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              pagination: customPagination,
            }}
            slotProps={{
              pagination: {
                pageCount: count,
                page: page,
                type: "examMng",
                text: searcText,
              },
            }}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            sx={{ fontWeight: "500", fontSize: "15px" }}
            hideFooter={true}
            hideFooterPagination={true}
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
    </Layout>
  );
};

export default ExamMng;
