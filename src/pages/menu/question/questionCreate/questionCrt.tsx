import Layout from "@components/layouts/layout";
import React, { useReducer, ChangeEvent } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { GridColDef, DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
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
  //questionList 에 넘겨줄 rowData
  const [rowDataList, setRowDataList] = React.useState([] as any);
  // 전체 체크 했을 때 어떤 값들이 들어가 있었는지
  const [unitCheckAll, setUnitCheckAll] = React.useState([] as any);
  const [multiCheckAllFlag, setMultiCheckAllFlag] = React.useState(true);

  const [any, forceUpdate] = useReducer((num) => num + 1, 0); // 컴포넌트 강제 랜더링을 위한 state

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

  const checkAll = (unitNum: GridRowSelectionModel) => {
    console.log("multiCheckAllFlag:::", multiCheckAllFlag);
    if (!multiCheckAllFlag) {
      console.log("아무일도 안일어남 multiCheckAllFlag:::", multiCheckAllFlag);
      setUnitCheckAll(unitNum);
      setMultiCheckAllFlag(true);
      return;
    }
    console.log("ttt", unitNum);
    console.log("unitCheckAll::", unitCheckAll);

    let newChecked = [...checked];
    const newDataList = [...rowDataList];

    // debugger;
    // 체크 했을 때 (unitCheckAll.length < unitNum.length)
    // if(unitCheckAll.length === unitNum.length){
    //   console.log("아무일도 안일어남");
    //   // return;
    // }
    if (unitCheckAll.length < unitNum.length) {
      for (let i = 0; i < unitNum.length; i++) {
        // 새로 체크
        let nodes = document.querySelectorAll(
          `input[type=checkbox][value="${unitNum[i]}"]`
        ) as NodeListOf<HTMLInputElement>;
        for (let j = 0; j < nodes.length; j++) {
          let curNodeId = parseInt(nodes[j].id);
          let curIdx = newChecked.indexOf(curNodeId);
          if (curIdx === -1) {
            // checkBoxInput?.click();
            newChecked.push(parseInt(nodes[j].id));

            let row = JSON.parse(nodes[j].dataset.passage as any);
            newDataList.push({
              passageYear: searchYear,
              passageName: row.passageName,
              passageNumber: row.passageNumber,
              passageId: row.passageId,
              passageUnit: row.passageUnit,
            });
          }
        }
      }
    }
    // 체크 해제 했을 떄 (unitCheckAll.length > unitNum.length)
    else {
      for (let i = 0; i < unitCheckAll.length; i++) {
        if (unitNum.indexOf(unitCheckAll[i]) === -1) {
          // 체크 해제 됨
          let nodes = document.querySelectorAll(
            `input[type=checkbox][value="${unitCheckAll[i]}"]`
          ) as NodeListOf<HTMLInputElement>;
          for (let j = 0; j < nodes.length; j++) {
            let curNodeId = parseInt(nodes[j].id);
            let curIdx = newChecked.indexOf(curNodeId);
            if (curIdx !== -1) {
              newChecked.splice(curIdx, 1);
              newDataList.splice(curIdx, 1);
            }
          }
        }
      }
    }
    console.log("newChecked::", newChecked);
    setUnitCheckAll(unitNum);
    setChecked(() => newChecked);
    setRowDataList(() => newDataList);
  };

  // 1 row multi check box
  // const checkMultiOneRow = (rowId: number) => {
  //   console.log("rowId", rowId);
  //   let curIdx = multiChecked.indexOf(
  //     searchPassage + searchYear + passageName + page + rowId
  //   );
  //   if (curIdx !== -1) {
  //     // 체크 해제 해야함
  //     deleteRow([rowId]);
  //   } else {
  //     // 체크 해야함
  //     insertRow([rowId]);
  //   }
  // };

  // 페이지 변경 -> 강, 지문 번호 조회 api 다시 뿌려줌
  const changePage = async (page: number) => {
    console.log("page::", page);
    try {
      const passageType = convertPassageType(searchPassage);

      const API_URL = `${_url}/api/v1/question/search/passage-numbers?page=${page}&size=5&passageType=${passageType}&passageYear=${searchYear}&&passageName=${passageName}`;
      const res: any = await axios.get(API_URL);
      console.log("url", API_URL);
      console.log("data:::", res.data);

      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].id = i;
      }
      console.log("checked:::", checked);
      // console.log("multicheck::", multiChecked);

      setRowData(res.data.list);
      setTotalPageSize(res.data.pageSize);
      setPage(page);
    } catch (error) {
      console.log(error);
    }
  };

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

      console.log("res.data", res.data);
      console.log("checked:::", checked);

      setPassageName(passageName);
      setRowData(res.data.list);
      setTotalPageSize(res.data.pageSize);
    } catch (error) {
      console.log(error);
    }
  };

  //연도 이벤트
  const handleYear = async (event: SelectChangeEvent) => {
    try {
      setSearchTextBook([]); // 교재명 리스트부터 초기화
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

  // 단일 버튼 해제/체크 시, 멀티 체크 박스 해제/체크
  const checkMultiBox = (
    passageId: number,
    newChecked: number[],
    checkFlag: boolean
  ) => {
    // debugger;
    console.log("passageId", passageId);
    console.log("new checked::", newChecked);
    console.log("체쿠 여부::", checkFlag);
    console.log("unitCheckAll:::", unitCheckAll);

    let target = document.getElementById(
      passageId.toString()
    ) as HTMLInputElement;
    if (!target) return; // 다른 페이지에서 remove했을 경우

    let rowId = parseInt(target.value);
    console.log("rowId:::", rowId);
    const multiNodes = document.querySelectorAll(
      `input[type=checkbox][aria-label]`
    ) as NodeListOf<HTMLInputElement>;
    const nodes = document.querySelectorAll(
      `input[type=checkbox][value="${rowId}"]`
    ) as NodeListOf<HTMLInputElement>;

    if (checkFlag) {
      let flag = true;
      for (let i = 0; i < nodes.length; i++) {
        if (newChecked.indexOf(parseInt(nodes[i].id)) === -1) {
          flag = false;
          break;
        }
      }

      if (flag) {
        // multi checkbox 체크
        if (!multiNodes[rowId + 1].checked) {
          multiNodes[rowId + 1].click();
        }
      }
    } else {
      // 멀티 체크박스 해제
      if (multiNodes[rowId + 1].checked) {
        let newRowDataList = [...rowDataList];
        multiNodes[rowId + 1].click();

        setChecked(newChecked);
        setRowDataList(newRowDataList);
      }
    }
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    // debugger;
    let target = event.target;
    let row = JSON.parse(target.dataset.passage as any);
    let newChecked = [...checked];
    let checkFlag = true; // 체크 여부

    const currentIndex = newChecked.indexOf(row.passageId);
    if (currentIndex === -1) {
      console.log("푸시::", row.passageId);
      newChecked.push(row.passageId);
      checked.push(row.passageId);
      setChecked((checked: any) => {
        return checked;
      });

      setRowDataList((rowDataList: any) => {
        rowDataList.push({
          passageYear: searchYear,
          passageName: row.passageName,
          passageNumber: row.passageNumber,
          passageId: row.passageId,
          passageUnit: row.passageUnit,
        });
        return rowDataList;
      });
    } else {
      console.log("슬라이스::", row.passageId);
      checkFlag = false;

      newChecked.splice(currentIndex, 1);
      checked.splice(currentIndex, 1);
      setChecked((checked: any) => {
        return checked;
      });

      rowDataList.splice(currentIndex, 1);
      setRowDataList((rowDataList: any) => {
        return rowDataList;
      });
    }

    checkMultiBox(row.passageId, newChecked, checkFlag);
    forceUpdate(); // 컴포넌트 재 랜더링
  };

  /* 오른쪽 side box에서 remove하기위한 event */
  const removeCheckBox = (row: any) => {
    let newChecked = [...checked];
    let curIdx = newChecked.indexOf(row.passageId);

    newChecked.splice(curIdx, 1);
    setChecked(newChecked);

    rowDataList.splice(curIdx, 1);
    setRowDataList((rowDataList: any) => {
      return rowDataList;
    });

    checkMultiBox(row.passageId, newChecked, false);
    forceUpdate(); // 컴포넌트 재 랜더링
  };

  function checkT(id: any) {
    // console.log("체크드체크:::", checked);
    return checked.indexOf(id) !== -1;
  }

  // selectbox 선택시 출력되는 그리드
  const columns: GridColDef[] = [
    {
      field: "passageUnit",
      headerName: "강",
      width: 150,

      editable: false,
      align: "center",
      sortable: false,
      headerAlign: "center",
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
                  inputProps={
                    {
                      "data-passage": `${JSON.stringify(row)}`,
                    } as any
                  }
                  onChange={(event) => handleCheckBox(event)}
                  // checked={checked.indexOf(row.passageId) !== -1} // 다른 화면 갓다와도 체크되게 함
                  checked={checkT(row.passageId)} // 다른 화면 갓다와도 체크되게 함
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
                  <InputLabel id="demo-simple-select-label">
                    지문유형
                  </InputLabel>
                  <Select
                    value={searchPassage}
                    onChange={handlePassage}
                    labelId="demo-simple-select-label"
                  >
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
                    labelId="demo-simple-select-label"
                  >
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
                    labelId="demo-simple-select-label"
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
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) =>
                  checkAll(newRowSelectionModel)
                }
                hideFooter={true}
                hideFooterPagination={true}
                sx={
                  rowData.length > 0
                    ? { fontWeight: "500", fontSize: "15px", height: "100%" }
                    : { fontWeight: "500", fontSize: "15px", height: "400px" }
                }
              />
            </Box>
            <Pagination
              count={totalPageSize}
              onChange={(event, value) => changePage(value - 1)}
              page={page + 1}
              showFirstButton
              showLastButton
              shape="rounded"
              sx={{ display: "flex" }}
            />
          </div>
          <div className="css-margin-left100 ">
            <QuestionList
              width={500}
              height={600}
              rowData={rowDataList}
              setRowData={setRowDataList}
              buttonName={params.Children}
              checked={checked}
              setChecked={setChecked}
              removeRow={removeCheckBox}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionCrt;
