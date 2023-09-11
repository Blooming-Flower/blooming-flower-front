import Layout from "@components/layouts/layout";
import React, { useState } from "react";

import QuestionList from "./questionList";

import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

//css
import "@css/questionCreate/questionCrt.scss";
import { GridColDef, DataGrid } from "@mui/x-data-grid";

//연도 , 교재 , 강 Select
const yearSelect = [
  "2015",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
];
const textbookSelect = ["영어1", "영어2", "영어3", "영어4", "영어5"];
const lectureSelect = ["1강", "2강", "3강", "4강", "5강", "6강"];

//지문 체크 박스
const checkBoxList = [{}];

const QuestionCrt = () => {
  const [searchYear, setSearchYear] = React.useState("");
  const [searchTextBook, setSearchTextBook] = React.useState("");
  const [searchlecture, setSearchlecture] = React.useState("");
  const [page, setPage] = React.useState(0);
  const handleBook = (event: SelectChangeEvent) => {
    setSearchYear(event.target.value as string);
    setSearchTextBook(event.target.value as string);
    setSearchlecture(event.target.value as string);
  };

  //데이터 그리드 체크박스 선택시 데이터 저장할 빈배열

  const columns: GridColDef[] = [
    {
      field: "chapter",
      headerName: "강",
      width: 150,
      editable: true,
    },
    {
      field: "num",
      headerName: "지문",
      type: "number",
      width: 300,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      year: "2020",
      name: "수능특강 Light 영어독해",
      chapter: "18강",
      count: 8,
      num: 11,
    },
    {
      id: 2,
      year: "2023",
      name: "수능특강 Light 영어독해",
      chapter: "17강",
      count: 10,
      num: 11,
    },
    {
      id: 3,
      year: "2020",
      name: "올림포스1",
      chapter: "Test1",
      count: 12,
      num: 11,
    },
    {
      id: 4,
      year: "2022",
      name: "올림포스 연합기출",
      chapter: "Test2",
      count: 35,
      num: 11,
    },
    { id: 5, year: "2021", name: "Jon", chapter: 1, count: 35, num: 11 },
    { id: 6, year: "2023", name: "Jon", chapter: 1, count: 35, num: 11 },
    { id: 7, year: "2023", name: "Jon", chapter: 1, count: 35, num: 11 },
  ];
  return (
    <Layout>
      <Grid container spacing={2}>
        <div className="mainCont mainCont2">
          <Typography
            variant="h3"
            sx={{ fontWeight: "500", color: "#ff8b2c", paddingBottom: "20px" }}
          >
            문제 출제
          </Typography>
          <Box
            sx={{
              maxWidth: "700px",
              height: "100%",
              borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
              borderTop: "1px solid rgba(0, 0, 0, 0.23)",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                color: "#8A8683",
                width: "70px",
                backgroundColor: "#E8E7E7",
                textAlign: "center",
                padding: "16px 0",
              }}
            >
              연도
            </Typography>
            <FormControl sx={{ width: "110px", marginLeft: "20px" }}>
              <Select value={searchYear} onChange={handleBook}>
                {yearSelect.map((text, id) => (
                  <MenuItem key={id} value={text}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography
              sx={{
                fontWeight: "700",
                color: "#8A8683",
                width: "70px",
                backgroundColor: "#E8E7E7",
                textAlign: "center",
                padding: "16px 0",
              }}
            >
              교재
            </Typography>
            <FormControl sx={{ width: "300px", marginLeft: "20px" }}>
              <Select
                id="select-box"
                value={searchTextBook}
                onChange={handleBook}
              >
                {textbookSelect.map((text, id) => (
                  <MenuItem key={id} value={text}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography
              sx={{
                fontWeight: "700",
                color: "#8A8683",
                width: "70px",
                backgroundColor: "#E8E7E7",
                textAlign: "center",
                padding: "16px 0",
              }}
            >
              강
            </Typography>
            <FormControl sx={{ width: "110px", marginLeft: "20px" }}>
              <Select
                id="select-box"
                value={searchlecture}
                onChange={handleBook}
              >
                {lectureSelect.map((text, id) => (
                  <MenuItem key={id} value={text}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* 지문선택 */}

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
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
        <QuestionList />
      </Grid>
    </Layout>
  );
};

export default QuestionCrt;
