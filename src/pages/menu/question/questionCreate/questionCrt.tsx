import Layout from "@components/layouts/layout";
import React, { useEffect, useState } from "react";

import QuestionList from "@pages/menu/question/questionCreate/questionList";

import {
    Box, Button,
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
import {GridColDef, DataGrid, GridRowParams} from "@mui/x-data-grid";
import { PASSAGETYPE, YEAR } from "@common/const";
import { addId } from "@utils/functions";
import { $GET } from "@utils/request";
import axios from "axios";

//지문 체크 박스
const checkBoxList = [{}];

const QuestionCrt = () => {
  const [searchYear, setSearchYear] = React.useState("");
  let yearData: string;
  const [searchTextBook, setSearchTextBook] = React.useState("");
  let bookData: string;
  const [searchlecture, setSearchlecture] = React.useState("");
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const handleBook = (event: SelectChangeEvent) => {
    setSearchYear(event.target.value as string);
    setSearchTextBook(event.target.value as string);
    setSearchlecture(event.target.value as string);
  };

  // 교재 유형 , 연도에 해당되는 교재명 api
  // 지문유형 , 연도 , 교재로 바꾸고
  // 강 지문 리스트 받아오는 거 만들기

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
      type: "actions",
      width: 300,
      editable: true,
        getActions: (params: GridRowParams) => [
            <Button
                variant="outlined"
                color="warning"
                size="medium"
            >
                수정
            </Button>,
        ],
    },
  ];

  //필드 임시데이터
  const rows = [
    {
      id: 1,
      year: "2020",
      name: "수능특강 Light 영어독해",
      chapter: "18강",
      count: 8,
      num: 11,
    },
  ];

  return (
    <Layout>
      <Grid container spacing={2}>
        <div className="mainCont mainCont2">
          <Typography
            variant="h4"
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
              지문 유형
            </Typography>
            <FormControl sx={{ width: "110px", marginLeft: "20px" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchYear}
                label="Year"
                onChange={handleBook}
              >
                {YEAR.map((text, id) => (
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
              연도
            </Typography>
            <FormControl sx={{ width: "300px", marginLeft: "20px" }}>
              <Select id="select-box" value={searchYear} onChange={handleBook}>
                {YEAR.map((text, id) => (
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
            <FormControl sx={{ width: "110px", marginLeft: "20px" }}>
              <Select id="select-box" value={searchlecture}>
                {PASSAGETYPE.map((text, id) => (
                  <MenuItem key={id} value={text}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* 지문선택 */}
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooterPagination={true}
            sx={{ fontWeight: "500", fontSize: "15px" }}
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
