import Layout from "@components/layouts/layout";
import CustomButton from "@components/ui/button/custeomButton";
import { FormControl, TextField, Pagination, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import * as React from "react";
import {ReactComponent as PdfSvg} from 'src/assets/svg/PdfSvg.svg';

const ExamMng = () => {
  const [searcText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const popupRef: any = React.useRef();

  const textFieldOnChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      currentTarget: { value }
    } = event;
    setSearchText(value);
  };

  const deleteExam = () => {
    popupRef.current.handleOpen();
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 700,
      align: "center",
      headerAlign: "center",
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
      // getActions: (params : GridRowParams) => {
      //   <PdfSvg></PdfSvg>
      // }
    },
    {
      field: "actions",
      headerName: "삭제",
      width: 150,
      align: "center",
      headerAlign: "center",
      getActions: (params : GridRowParams) => [
        <Button
          variant="outlined"
          color="warning"
          size="medium"
          onClick={deleteExam}
        >
          삭제
        </Button>,
      ],
    },
  ];
  const rows = [
    {
      id: 1,
      title: "[2023-2 중간]종촌고2",
      createDate: (new Date()).toISOString().split('T')[0],
      downPdf : <PdfSvg width={50} height={50} fill="#ED1C24"/>
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
        <div style={{ textAlign: "right" }}>
          <TextField
            // size="small"
            label="타이틀"
            variant="outlined"
            onChange={textFieldOnChange}
            style={{ marginRight: "20px", width: "400px" }}
          >
            {searcText}
          </TextField>
          <CustomButton type="string" label="검색">{''}</CustomButton>
        </div>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            sx={{ fontWeight: "500", fontSize: "15px" }}
            hideFooterPagination={true}
          />
          <Pagination
            count={parseInt((rows.length / 5).toString()) + 1}
            onChange={(event, value) => setPage(value - 1)}
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
