import Layout from "@components/layouts/layout";
import * as React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { GridColDef, DataGrid, GridRowSelectionModel, GridCallbackDetails } from "@mui/x-data-grid";
import { PASSAGETYPE, YEAR, URL } from "@common/const";
import axios from "axios";

//css
import "@css/questionCreate/questionList.scss";
import "@css/questionCreate/questionCrt.scss";
import QuestionList from "./questionList";

const QuestionCrt = (params: any) => {
  const [searchPassage, setSearchPassage] = React.useState("");
  const [searchYear, setSearchYear] = React.useState("");
  const [searchTextBook, setSearchTextBook] = React.useState([]);
  const [passageName, setPassageName] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowData, setRowData] = React.useState([] as any);
  const [checked, setChecked] = React.useState([] as any);
  //questionList 에 넘겨줄 rowData
  const [rowDataList, setRowDataList] = React.useState([] as any);


  const _url: string = URL.SERVER_URL;

  //지문유형 name 적용
  const convertPassageType = (type: string) => {
    switch (type) {
      case "교과서":
        return "P1";
      case "모의고사":
        return "P2";
      case "EBS(고3) (1)":
        return "P3";
      case "EBS(고3) (2)":
        return "P4";
      case "부교재":
        return "P5";
      default:
        return "P6";
    }
  };

  const checkAll = (rowNum: GridRowSelectionModel, details: GridCallbackDetails) => {
    console.log("ttt", rowNum)
    console.log("detail::", details)
    if (rowNum.length === 0) {
      // [0, 1, 2, 3, 4].forEach(num => {
      //   let nodes = document.querySelectorAll(`input[type=checkbox][value="${num}"]`) as NodeListOf<HTMLInputElement>;
      //   // debugger;
      //   for (let i = 0; i < nodes.length; i++) {
      //     // console.log(document.getElementById(nodes[i].id));
      //     document.getElementById(nodes[i].id)?.click();  
      //     // break;
      //   }
      // });
    } else {
      // rowNum.forEach(num => {
      //   let nodes = document.querySelectorAll(`input[type=checkbox][value="${num}"]`) as NodeListOf<HTMLInputElement>;
      //   // debugger;
      //   for (let i = 0; i < nodes.length; i++) {
      //     // console.log(document.getElementById(nodes[i].id));
      //     console.log("type::",typeof nodes[i].id)
      //     // if (checked.indexOf(parseInt(nodes[i].id)) == -1) {
      //     //   checked.push(parseInt(nodes[i].id));
      //     // }
      //     document.getElementById(nodes[i].id)?.click();
      //     // break;
      //   }
      // });
    }

  }

  // 페이지 변경 -> 강, 지문 번호 조회 api 다시 뿌려줌
  const changePage = async (page: number) => {
    setPage(page)

    try {
      const passageType = convertPassageType(searchPassage);

      const API_URL = `${_url}/api/v1/question/search/passage-numbers?page=${page - 1}&size=5&passageType=${passageType}&passageYear=${searchYear}&&passageName=${passageName}`;
      const res: any = await axios.get(API_URL);
      console.log("url", API_URL)
      console.log("data:::", res.data)
      if (res.data.length != 0) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].id = i;
        }
      }
      console.log("checked:::", checked)


      setRowData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // [문제 출제] 강, 지문 번호 조회
  const handlePassageName = async (event: SelectChangeEvent) => {
    try {
      setPage(0);
      const passageName = event.target.value;
      const passageType = convertPassageType(searchPassage);

      const API_URL = `${_url}/api/v1/question/search/passage-numbers?page=0&size=5&passageType=${passageType}&passageYear=${searchYear}&&passageName=${passageName}`;
      const res: any = await axios.get(API_URL);
      setPassageName(event.target.value);

      if (res.data.length != 0) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].id = i;
        }
      }
      console.log("checked:::", checked)
      setRowData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //연도 이벤트
  const handleYear = async (event: SelectChangeEvent) => {
    try {
      setSearchTextBook([]);  // 교재명 리스트부터 초기화
      setPassageName("");

      const year = event.target.value;
      if (searchPassage) {
        const passageType = convertPassageType(searchPassage);

        const API_URL = `${_url}/api/v1/question/search/passage-names?passageType=${passageType}&year=${year}`;
        const res = await axios.get(API_URL);
        setSearchTextBook(res.data);
      }

      setSearchYear(event.target.value);
      setRowData([]);
    } catch (error) {
      console.log(error);
    }
  };

  // // 지문 유형 , 연도에 해당되는 교재명 api
  const handlePassage = async (event: SelectChangeEvent) => {
    try {
      setSearchTextBook([]); // 교재명 리스트부터 초기화
      setPassageName("");

      const lecture = event.target.value;
      if (searchYear) {
        const passageType = convertPassageType(lecture);

        const API_URL = `${_url}/api/v1/question/search/passage-names?passageType=${passageType}&year=${searchYear}`;
        const res = await axios.get(API_URL);
        setSearchTextBook(res.data);
      }

      setSearchPassage(lecture);
      setRowData([]);
    } catch (error) {
      console.log(error);
    }
  };

  //지문 체크박스 이벤트 (선택&취소)
  const handleToggle = (row: any) => () => {
    const currentIndex = checked.indexOf(row.passageId);
    const newChecked = [...checked];
    const newRowDataList = [...rowDataList];

    console.log("value::", row)
    console.log("currentIndex::", currentIndex)
    console.log("checked:::", checked)
    if (currentIndex === -1) {
      newChecked.push(row.passageId);
      newRowDataList.push({
        passageYear: searchYear,
        passageNumber: row.passageNumber,
        passageId: row.passageId,
        passageUnit: row.passageUnit,
      });
    } else {
      newChecked.splice(currentIndex, 1);
      newRowDataList.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setRowDataList(newRowDataList);
  };

  // selectbox 선택시 출력되는 그리드
  const columns: GridColDef[] = [
    {
      field: "passageUnit",
      headerName: "강",
      width: 150,
      editable: false,
      align: "center",
      sortable: false,
      headerAlign: "center"
    },
    {
      field: "passageInfo",
      headerName: "지문",
      width: 300,
      type: "actions",
      editable: false,
      headerAlign: "center",
      getActions: (params) => [
        <>
          {params.row.passageInfo.map((row: any) => {
            return (
              <div key={row.passageNumber} id="checkbox-list">
                <Checkbox
                  id={row.passageId}
                  value={params.id}
                  onClick={handleToggle(row)}
                  inputProps={{
                    // @ts-ignore
                    'data-order': row.id,
                  }}
                  checked={checked.indexOf(row.passageId) != -1} // 다른 화면 갓다와도 체크되게 함
                />
                {row.passageNumber}
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
      <Grid container spacing={2} className="grid-template">
        <div className="mainCont mainCont2">
          <Typography
            variant="h2"
            className="menu-title"
            sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
          >
            문제 출제
          </Typography>
          <div style={{ display: "flex", gap: 15 }}>
            <div>
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
                  <p className="table-text">지문유형</p>
                </Typography>
                <FormControl sx={{ marginLeft: "20px" }}>
                  <InputLabel id="demo-simple-select-label">지문유형</InputLabel>
                  <Select
                    value={searchPassage}
                    onChange={handlePassage}
                    labelId="demo-simple-select-label">
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
                  <p className="table-text">연도</p>
                </Typography>
                <FormControl sx={{ marginLeft: "20px" }}>
                  <InputLabel id="demo-simple-select-label">연도</InputLabel>
                  <Select
                    value={searchYear}
                    onChange={handleYear}
                    labelId="demo-simple-select-label">
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
                  <p className="table-text">교재</p>
                </Typography>
                <FormControl sx={{ marginLeft: "20px" }}>
                  <InputLabel id="demo-simple-select-label">교재명</InputLabel>
                  <Select
                    value={passageName}
                    onChange={handlePassageName}
                    labelId="demo-simple-select-label">
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
                // getRowId={(row) => row.id}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel, details) => checkAll(newRowSelectionModel, details)}
                // disableRowSelectionOnClick

                hideFooterPagination={true}
                sx={{ fontWeight: "500", fontSize: "15px" }}
              />
              <Pagination
                count={parseInt((rowData.length / 5).toString()) + 1}
                onChange={(event, value) => changePage(value)}
                page={page}
                showFirstButton
                showLastButton
                shape="rounded"
                sx={{ display: "flex" }}
              />
            </div>
            <QuestionList
              width={360}
              height={600}
              rowData={rowDataList}
              setRowData={setRowDataList}
              buttonName={params.Children}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </div>
      </Grid>
    </Layout>
  );
};

export default QuestionCrt;