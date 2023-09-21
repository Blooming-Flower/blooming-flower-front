import Layout from "@components/layouts/layout";
import * as React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { PASSAGETYPE, YEAR } from "@common/const";
import axios from "axios";

//css
import "@css/questionCreate/questionList.scss";
import "@css/questionCreate/questionCrt.scss";
import QuestionList from "./questionList";

const QuestionCrt = (params: any) => {
  const [searchlecture, setSearchlecture] = React.useState("");
  const [searchYear, setSearchYear] = React.useState("");
  const [searchTextBook, setSearchTextBook] = React.useState([]);
  const [passageName, setPassageName] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowData, setRowData] = React.useState([] as any);
  const [checked, setChecked] = React.useState([] as any);
  //questionList 에 넘겨줄 rowData
  const [rowDataList, setRowDataList] = React.useState([] as any);

  const convertPassageType = (type: string) => {
    switch (type) {
      case "교과서":
        return "P1";
      case "모의고사":
        return "P2";
      case "EBS":
        return "P3";
      case "부교재":
        return "P4";
      default:
        return "P5";
    }
  };

  // [문제 출제] 강, 지문 번호 조회
  const handlePassageName = async (event: SelectChangeEvent) => {
    try {
      const passageName = event.target.value;
      const passageType = convertPassageType(searchlecture);

      const API_URL = `http://43.201.142.170:29091/api/v1/question/search/passage-numbers?
      page=0&size=10&passageType=${passageType}&passageYear=${searchYear}&&passageName=${passageName}`;
      const res: any = await axios.get(API_URL);
      console.log(res);
      setPassageName(event.target.value);

      if (res.data.length != 0) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].id = i;
        }
      }
      setRowData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //연도 이벤트
  const handleYear = async (event: SelectChangeEvent) => {
    try {
      console.log("event.target.value::", event.target.value);
      const passageType = convertPassageType(searchlecture);
      const year = event.target.value;

      const API_URL = `http://43.201.142.170:29091/api/v1/question/search/passage-names?passageType=${passageType}&year=${year}`;
      const res = await axios.get(API_URL);
      console.log(res);
      setSearchTextBook(res.data);
      setSearchYear(event.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  // // 교재 유형 , 연도에 해당되는 교재명 api
  const handleLecture = async (event: SelectChangeEvent) => {
    try {
      //yearData = event.target.value as string;
      const lecture = event.target.value;
      if (searchYear) {
        const passageType = convertPassageType(lecture);

        const API_URL = `http://43.201.142.170:29091/api/v1/question/search/passage-names?passageType=${passageType}&year=${searchYear}`;
        const res = await axios.get(API_URL);
        console.log(res);
        setSearchTextBook(res.data);
      }
      setSearchlecture(lecture);
    } catch (error) {
      console.log(error);
    }
  };

  //지문 체크박스 이벤트 (선택&취소)
  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newRowDataList = [...rowDataList];
    console.log("value;;;", value);
    if (currentIndex === -1) {
      newChecked.push(value);
      newRowDataList.push({
        passageYear: searchYear,
        passageNumber: value.passageNumber,
        passageId: value.passageId,
        passageUnit: value.passageUnit,
      });
      console.log(" newRowDataList;;;;", newRowDataList);
    } else {
      newChecked.splice(currentIndex, 1);
      newRowDataList.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setRowDataList(newRowDataList);
  };

  //questionList 에 넘겨줄 rowData
  // rowDataList = [
  //   {
  //     searchYear:,
  //     searchlecture:,
  //     passageNumber:,
  //     passageId:
  //   }
  // ]
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
      field: "passageInfo",
      headerName: "지문",
      type: "actions",
      width: 300,
      editable: true,
      getActions: (params) => [
        <>
          {params.row.passageInfo.map((row: any) => {
            return (
              <div key={row.passageNumber} id="checkbox-list">
                <input
                  type="checkbox"
                  value={row.passageId}
                  onClick={handleToggle(row)}
                  onChange={(e) => {
                    handleToggle(console.log(e.target.value));
                  }}
                  defaultChecked={checked.indexOf(row) !== -1}
                />
                {row.passageId}
              </div>
            );
          })}
        </>,
      ],
      align: "center",
    },
  ];

  return (
    <Layout>
      <Grid container spacing={2}>
        <div className="mainCont mainCont2">
          <Typography
            variant="h2"
            className="menu-title"
            sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
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
              <InputLabel id="demo-simple-select-label">교과서</InputLabel>
              <Select
                value={searchlecture}
                label="지문유형"
                onChange={handleLecture}
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
              <Select id="select-box" value={searchYear} onChange={handleYear}>
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
              <InputLabel id="demo-simple-select-label">교재1</InputLabel>
              <Select
                id="select-box"
                value={passageName}
                onChange={handlePassageName}
              >
                {searchTextBook.map((text, id) => (
                  <MenuItem key={id} value={text}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* 지문선택 */}
          <DataGrid
            rows={rowData}
            getRowId={(row) => row.id}
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
            count={parseInt((rowData.length / 5).toString()) + 1}
            onChange={(event, value) => setPage(value - 1)}
            page={page + 1}
            showFirstButton
            showLastButton
            shape="rounded"
            sx={{ display: "flex" }}
          />
        </div>

        <QuestionList
          width={360}
          height={300}
          rowData={rowDataList}
          setRowData={setRowDataList}
          buttonName={params.Children}
        />
      </Grid>
    </Layout>
  );
};

export default QuestionCrt;
