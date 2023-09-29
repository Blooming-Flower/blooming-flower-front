import Layout from "@components/layouts/layout";
import React, { useReducer, useEffect } from "react";
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
import { GridColDef, DataGrid, GridRowSelectionModel, GridCallbackDetails, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
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
  const [totalPageSize, setTotalPageSize] = React.useState(0);
  const [rowData, setRowData] = React.useState([] as any);
  const [checked, setChecked] = React.useState([] as any);
  const [multiChecked, setMultiChecked] = React.useState([] as any);
  //questionList 에 넘겨줄 rowData
  const [rowDataList, setRowDataList] = React.useState([] as any);

  // 전체 체크 했을 때 어떤 값들이 들어가 있었는지

  const [any, forceUpdate] = useReducer(num => num + 1, 0); // 컴포넌트 강제 랜더링을 위한 state

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

  // all row multi check box
  const checkMultiAll = (rowLength: number) => {
    let curIdx = multiChecked.indexOf(searchPassage + searchYear + passageName + page + "all");
    if (curIdx !== -1) {
      // 전체 해제
      multiChecked.splice(curIdx, 1)
      setMultiChecked((multiChecked: any) => {
        return multiChecked;
      });

      clickMultiOneRowModule(true, rowLength);

    } else {
      // 전체 체크
      setMultiChecked((multiChecked: any) => {
        multiChecked.push(searchPassage + searchYear + passageName + page + "all");
        return multiChecked;
      })

      clickMultiOneRowModule(false, rowLength);
    }
  }

  // 전체 체크 눌렀을 때, 1 row multi check box 반복하는 module
  const clickMultiOneRowModule = (flag: boolean, rowLength: number) => {
    for (let i = 0; i < rowLength; i++) {
      const multiCheckbox = document.querySelector(`input[type=checkbox][value="${i}"][data-type="multi-check"]`) as HTMLInputElement;
      if (multiCheckbox.checked === flag) {
        checkMultiOneRow(i);
      }
    }
  }


  // 1 row multi check box 
  const checkMultiOneRow = (rowId: number) => {
    console.log("rowId", rowId)
    const multiCheckbox = document.querySelector(`input[type=checkbox][value="${rowId}"][data-type="multi-check"]`) as HTMLInputElement;

    let nodes = document.querySelectorAll(`input[type=checkbox][value="${rowId}"]`) as NodeListOf<HTMLInputElement>;
    let curIdx = multiChecked.indexOf(searchPassage + searchYear + passageName + page + rowId);
    if (curIdx !== -1) {
      // 체크 해제 해야함
      multiChecked.splice(curIdx, 1)
      setMultiChecked((multiChecked: any) => {
        return multiChecked;
      });

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] !== multiCheckbox) {
          if (nodes[i].checked) {
            nodes[i]?.click();
          }
        }
      }
    } else {
      // 체크 해야함
      setMultiChecked((multiChecked: any) => {
        multiChecked.push(searchPassage + searchYear + passageName + page + rowId);
        return multiChecked;
      })

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] !== multiCheckbox) {
          if (!nodes[i].checked) {
            nodes[i]?.click();
          }
        }
      }
    }


    console.log("checked:::", checked)
    console.log("multiChecked:::", multiChecked)
  }

  // const checkAll = (unitNum: any) => {
  //   console.log("ttt", unitNum)
  //   console.log("unitCheckAll::", unitCheckAll)



  // 페이지 변경 -> 강, 지문 번호 조회 api 다시 뿌려줌
  const changePage = async (page: number) => {
    setPage(page)

    try {
      const passageType = convertPassageType(searchPassage);

      const API_URL = `${_url}/api/v1/question/search/passage-numbers?page=${page - 1}&size=5&passageType=${passageType}&passageYear=${searchYear}&&passageName=${passageName}`;
      const res: any = await axios.get(API_URL);
      console.log("url", API_URL)
      console.log("data:::", res.data)

      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].id = i;
      }
      console.log("checked:::", checked)

      setRowData(res.data.list);
      setTotalPageSize(res.data.pageSize)
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

      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].id = i;
      }

      console.log("res.data", res.data)
      console.log("checked:::", checked)

      setPassageName(passageName);
      setRowData(res.data.list);
      setTotalPageSize(res.data.pageSize)

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
    console.log("row.passageId 시작", row.passageId)
    const currentIndex = checked.indexOf(row.passageId);
    if (currentIndex === -1) {
      setChecked((checked: any) => {
        checked.push(row.passageId)
        return checked;
      });

      setRowDataList((rowDataList: any) => {
        rowDataList.push({
          passageYear: searchYear,
          passageNumber: row.passageNumber,
          passageId: row.passageId,
          passageUnit: row.passageUnit,
        })
        return rowDataList;
      });
    } else {
      checked.splice(currentIndex, 1)
      setChecked((checked: any) => {
        return checked;
      });

      rowDataList.splice(currentIndex, 1)
      setRowDataList((rowDataList: any) => {
        return rowDataList;
      });
    }

    forceUpdate(); // 컴포넌트 재 랜더링
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
                  id={row.passageId.toString()}
                  value={params.id}
                  onClick={handleToggle(row)}
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
      <div className="mainCont">
        <Typography
          variant="h2"
          className="menu-title"
          sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
        >
          문제 출제
        </Typography>
        <div className="grid-flex">

          <div className="css-with80">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%", paddingBottom: "20px" }}>

                <FormControl sx={{ width: "180px" }}>
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

                <FormControl sx={{ width: "180px", marginLeft: "20px" }}>
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


                <FormControl sx={{ width: "380px", marginLeft: "20px" }}>
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
              {/* <DataGrid
                rows={rowData}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => checkAll(newRowSelectionModel)}
                hideFooter={true}
                hideFooterPagination={true}

                sx={rowData.length > 0 ? { fontWeight: "500", fontSize: "15px", height: '100%' } : { fontWeight: "500", fontSize: "15px", height: '400px' }}
              /> */}

              <table>
                <thead>
                  <tr>
                    <td><input type="checkbox"
                      data-type="multi-check"
                      id={searchPassage + searchYear + passageName + page + "all"}
                      value={rowData.length}
                      checked={multiChecked.indexOf(searchPassage + searchYear + passageName + page + "all") != -1}
                      onChange={() => checkMultiAll(rowData.length)}
                    /></td>
                    <td> 강</td>
                    <td>지문</td>
                  </tr>
                </thead>
                <tbody>
                  {rowData.map((row: any) => {
                    console.log(row)
                    return (
                      <tr>
                        <td><input type="checkbox"
                          data-type="multi-check"
                          id={searchPassage + searchYear + passageName + page + row.id}
                          value={row.id}
                          checked={multiChecked.indexOf(searchPassage + searchYear + passageName + page + row.id) != -1}
                          onChange={() => checkMultiOneRow(row.id)}
                        /></td>
                        <td>{row.passageUnit}</td>
                        <td>
                          {row.passageInfo.map((passage: any) => {
                            return (
                              <>
                                < input type="checkbox"
                                  id={passage.passageId.toString()}
                                  value={row.id}
                                  checked={checked.indexOf(passage.passageId) != -1} // 다른 화면 갓다와도 체크되게 함
                                  onChange={handleToggle(passage)}
                                />
                                {passage.passageNumber}
                              </>

                            )
                          })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>

              </table>
            </Box>
            <Pagination
              count={totalPageSize}
              onChange={(event, value) => changePage(value)}
              page={page}
              showFirstButton
              showLastButton
              shape="rounded"
              sx={{ display: "flex" }}
            />
          </div>
          <div className="css-margin-left100 ">
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
      </div>
    </Layout>
  );
};

export default QuestionCrt;