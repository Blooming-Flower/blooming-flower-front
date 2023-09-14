import Layout from "@components/layouts/layout";
import CustomButton from "@components/ui/button/custeomButton";
import { FormControl, TextField, Pagination, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import * as React from "react";
// import pdfSvg from "/src/assets/svg/pdfSvg.svg";

const ExamMng = () => {
  const [searcText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);

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
        <img
          src="/src/assets/svg/pdfSvg.svg"
          width={30}
          height={30}
          onClick={downPdf}
        />
      ),
    },
    {
      field: "actions",
      headerName: "삭제",
      width: 150,
      align: "center",
      headerAlign: "center",
      getActions: (params: GridRowParams) => [
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
  const rows = [
    {
      id: 1,
      title: "[2023-2 중간]종촌고1",
      createDate: new Date().toISOString().split("T")[0],
      downPdf: "",
      actions: "",
    },
    {
      id: 2,
      title: "[2023-2 중간]종촌고2",
      createDate: new Date().toISOString().split("T")[0],
      // downPdf: "",
      actions: "",
    },
    {
      id: 3,
      title: "[2023-2 중간]종촌고3",
      createDate: new Date().toISOString().split("T")[0],
      downPdf: "",
      // actions: "",
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
          <CustomButton type="string" label="검색" />
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
