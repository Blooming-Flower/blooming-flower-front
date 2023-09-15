import Layout from "@components/layouts/layout";
import React, { useEffect, useState } from "react";

import QuestionList from "@pages/menu/question/questionCreate/questionList";

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
import { PASSAGETYPE, YEAR } from "@common/const";
import axios from "axios";
import { addId } from "@utils/functions";

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

  const handleBook = () => {
    let reqOption = {
      method: "get",
      header: {
        "content-type": "application/json;charset=UTF-8 ",
      },
    };
    fetch(
      "http://43.201.142.170:29091/api/v1/question/search/passage-names?passageType=P1&year=2023",
      reqOption
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    return [data, handleBook];
  };

  //연도 이벤트
  // const handleYear = async (event: SelectChangeEvent) => {
  //   try {
  //     yearData = event.target.value as string;
  //     setSearchYear(yearData);
  //     const API_URL =
  //       "http://43.201.142.170:29091/api/v1/question/search/passage-names?passageType=P1&year=2023";
  //     const res = await axios.get(API_URL);
  //     console.log(res);
  //     (res: any) => {
  //       setData(addId(res, yearData));
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // 교재 유형 , 연도에 해당되는 교재명 api
  // const handleBook = async (event: SelectChangeEvent) => {
  //   try {
  //     yearData = event.target.value as string;
  //     setSearchlecture(bookData);
  //     const API_URL =
  //       "http://43.201.142.170:29091/api/v1/question/search/passage-numbers?page=0&size=1&sort=string&passageType=P1&passageYear=2023&passageName=%EB%AA%A8%EC%9D%98%EA%B3%A0%EC%82%AC";
  //     const res = await axios.get(API_URL);
  //     console.log(res);
  //     (res: any) => {
  //       setData(addId(res, yearData));
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 지문유형 , 연도 , 교재로 바꾸고
  // 강 지문 리스트 받아오는 거 만들기

  const columns: GridColDef[] = [
    {
      field: "passageUnit",
      headerName: "강",
      width: 150,
      editable: true,
      align: "center",
      sortable: false,
    },
    {
      field: "questionCount",
      headerName: "지문",
      type: "number",
      width: 300,
      editable: true,
      align: "center",
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
                value={searchlecture || ""}
                label="지문유형"
                onChange={handleBook}
              >
                {PASSAGETYPE.map((text, id) => (
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
              <Select id="select-box" value={searchYear || ""} label="Year">
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
              <Select id="select-box" value={searchlecture || ""}>
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
            count={parseInt((data.length / 5).toString()) + 1}
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
