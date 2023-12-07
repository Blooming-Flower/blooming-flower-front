import Layout from "@components/layouts/layout";
import React, { useReducer, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { GridColDef, DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  PASSAGETYPE,
  YEAR,
  URL,
  QUESTIONTYPE,
  TXTUNIT,
  TXTNUM,
} from "@common/const";
import axios from "axios";
import { $GET, $POST } from "@utils/request";

//css
import "@css/questionCreate/questionList.scss";
import "@css/questionCreate/questionCrt.scss";
import QuestionList from "../questionCreate/questionList";
import CustomButton from "@components/ui/button/custeomButton";

const ExamCrt = (params: any) => {
  const [searchPassage, setSearchPassage] = React.useState("");
  const [searchYear, setSearchYear] = React.useState("");
  const [searchTextBook, setSearchTextBook] = React.useState([]);
  const [passageName, setPassageName] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [totalPageSize, setTotalPageSize] = React.useState(0);

  const [rowData, setRowData] = React.useState([] as any); // select 되는 grid data
  const [checked, setChecked] = React.useState([] as any); // 지문 번호 checkbox id
  const [multiChecked, setMultiChecked] = React.useState([] as any); // multi checkbox id
  // questionList 에 넘겨주기전 가지고 있을 rowData
  const [rowDataList, setRowDataList] = React.useState([] as any);
  // 담기전 가지고 있을 rowData
  const [examRowDataList, setExamRowDataList] = React.useState([] as any);
  // 전체 체크 했을 때 어떤 값들이 들어가 있었는지
  const [prevRowId, setPrevRowId] = React.useState({} as any);
  // 전체 문제 수
  const [totalCount, setTotalCount] = React.useState(0 as number);

  const [any, forceUpdate] = useReducer((num) => num + 1, 0); // 컴포넌트 강제 랜더링을 위한 state

  const _url: string = URL.SERVER_URL;
  let temp = 0;
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

  const checkAll = (unitNum: number[]) => {
    let prevRowNums = prevRowId[getUniqueKey()];

    if (!prevRowNums) {
      prevRowNums = [];
    }

    const newChecked = [...checked];
    const newDataList = [...rowDataList];
    const newMultiChecked = [...multiChecked];

    if (prevRowNums.length < unitNum.length) {
      for (let i = 0; i < unitNum.length; i++) {
        // 새로 체크
        let nodes = document.querySelectorAll(
          `input[type=checkbox][value="${unitNum[i]}"]`
        ) as NodeListOf<HTMLInputElement>;
        for (let j = 0; j < nodes.length; j++) {
          let curNodeId = parseInt(nodes[j].id);
          let curIdx = newChecked.indexOf(curNodeId);
          let row = JSON.parse(nodes[j].dataset.passage as any);

          if (curIdx === -1) {
            newChecked.push(parseInt(nodes[j].id));
            console.log("row::", row);
            newDataList.push({
              searchPassage: searchPassage,
              passageYear: searchYear,
              passageName: row.passageName,
              passageNumber: row.passageNumber,
              passageId: row.passageId,
              passageUnit: row.passageUnit,
              page: page,
              rowNum: row.rowNum,
            });
          }

          const multiCheckedIdx = newMultiChecked.indexOf(
            getUnitCheckboxId(row.passageUnit)
          );
          if (multiCheckedIdx === -1) {
            newMultiChecked.push(getUnitCheckboxId(row.passageUnit));
          }
        }
      }
    }
    // 체크 해제 했을 떄 (unitCheckAll.length > unitNum.length)
    else {
      for (let i = 0; i < prevRowNums.length; i++) {
        if (unitNum.indexOf(prevRowNums[i]) === -1) {
          // 체크 해제 됨
          let nodes = document.querySelectorAll(
            `input[type=checkbox][value="${prevRowNums[i]}"]`
          ) as NodeListOf<HTMLInputElement>;
          for (let j = 0; j < nodes.length; j++) {
            let curNodeId = parseInt(nodes[j].id);
            let curIdx = newChecked.indexOf(curNodeId);
            let row = JSON.parse(nodes[j].dataset.passage as any);

            if (curIdx !== -1) {
              newChecked.splice(curIdx, 1);
              newDataList.splice(curIdx, 1);
            }

            let multiCheckIdx = newMultiChecked.indexOf(
              getUnitCheckboxId(row.passageUnit)
            );
            if (multiCheckIdx !== -1) {
              newMultiChecked.splice(multiCheckIdx, 1);
            }
          }
        }
      }
    }
    // console.log("newChecked::", newChecked);
    prevRowId[getUniqueKey()] = unitNum;
    setChecked(() => newChecked);
    setRowDataList(() => newDataList);
    changeMasterCheckbox(newMultiChecked);
  };

  // 페이지 변경 -> 강, 지문 번호 조회 api 다시 뿌려줌
  const changePage = async (page: number) => {
    try {
      const passageType = convertPassageType(searchPassage);

      $GET(
        `${_url}/api/v1/exam/search/passage-numbers?page=${page}&size=10&passageType=${passageType}&passageYear=${searchYear}&&passageName=${passageName}`,
        (res: any) => {
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].id = i;
            res.data.list[i].questionCount = 0;
            for (let j = 0; j < res.data.list[i].passageInfo.length; j++) {
              res.data.list[i].questionCount =
                res.data.list[i].questionCount +
                res.data.list[i].passageInfo[j].questionCount;
            }

            if (!res.data.list[i].passageUnit) {
              res.data.list[i].passageUnit = "-";
              let passageInfoList = res.data.list[i].passageInfo;
              for (let j = 0; j < passageInfoList.length; j++) {
                res.data.list[i].passageInfo[j].passageUnit = "-";
              }
            }
            console.log(res.data.list[i].questionCount);
          }
          setRowData(res.data.list);
          setPage(page);
        }
      );
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

      $GET(
        `${_url}/api/v1/exam/search/passage-numbers?page=0&size=10&passageType=${passageType}&passageYear=${searchYear}&&passageName=${passageName}`,
        (res: any) => {
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].id = i;
            res.data.list[i].questionCount = 0;
            for (let j = 0; j < res.data.list[i].passageInfo.length; j++) {
              res.data.list[i].questionCount =
                res.data.list[i].questionCount +
                res.data.list[i].passageInfo[j].questionCount;
            }

            if (!res.data.list[i].passageUnit) {
              res.data.list[i].passageUnit = "-";
              let passageInfoList = res.data.list[i].passageInfo;
              for (let j = 0; j < passageInfoList.length; j++) {
                res.data.list[i].passageInfo[j].passageUnit = "-";
              }
            }
            console.log(res.data.list[i].questionCount);
          }

          setPassageName(passageName);
          setRowData(res.data.list);
          setTotalPageSize(res.data.pageSize);
        }
      );
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

        $GET(
          `${_url}/api/v1/exam/search/passage-names?passageType=${passageType}&year=${year}`,
          (res: any) => {
            setSearchTextBook(res.data);
          }
        );
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

        $GET(
          `${_url}/api/v1/exam/search/passage-names?passageType=${passageType}&year=${searchYear}`,
          (res: any) => {
            setSearchTextBook(res.data);
          }
        );
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
    let target = document.getElementById(
      passageId.toString()
    ) as HTMLInputElement;
    if (!target) return; // 다른 페이지에서 remove했을 경우

    let rowId = parseInt(target.value);
    const multiNodes = document.querySelectorAll(
      `input[type=checkbox][data-type=multi]`
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
        if (!multiNodes[rowId].checked) {
          multiNodes[rowId].checked = true;

          const multiCheckedIdx = multiChecked.indexOf(multiNodes[rowId].id);
          if (multiCheckedIdx === -1) {
            multiChecked.push(multiNodes[rowId].id);
          }

          if (!prevRowId[getUniqueKey()]) {
            prevRowId[getUniqueKey()] = [];
          }
          let prevRowIdx = prevRowId[getUniqueKey()].indexOf(rowId);
          if (prevRowIdx === -1) {
            prevRowId[getUniqueKey()].push(rowId);
          }
        }
      }
    } else {
      // 멀티 체크박스 해제
      if (multiNodes[rowId].checked) {
        let newRowDataList = [...rowDataList];
        multiNodes[rowId].checked = false;

        const multiCheckedIdx = multiChecked.indexOf(multiNodes[rowId].id);
        if (multiCheckedIdx !== -1) {
          multiChecked.splice(multiCheckedIdx, 1);
        }

        if (!prevRowId[getUniqueKey()]) {
          prevRowId[getUniqueKey()] = [];
        }
        let prevRowIdx = prevRowId[getUniqueKey()].indexOf(rowId);
        if (prevRowIdx !== -1) {
          prevRowId[getUniqueKey()].splice(prevRowIdx, 1);
        }

        setChecked(newChecked);
        setRowDataList(newRowDataList);
      }
    }

    changeMasterCheckbox([...multiChecked]);
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    let target = event.target;
    let row = JSON.parse(target.dataset.passage as any);
    let newChecked = [...checked];
    let checkFlag = true; // 체크 여부

    const currentIndex = newChecked.indexOf(row.passageId);
    if (currentIndex === -1) {
      newChecked.push(row.passageId);
      checked.push(row.passageId);
      setChecked((checked: any) => {
        return checked;
      });

      setRowDataList((rowDataList: any) => {
        rowDataList.push({
          searchPassage: searchPassage,
          passageYear: searchYear,
          passageName: row.passageName,
          passageNumber: row.passageNumber,
          passageId: row.passageId,
          passageUnit: row.passageUnit,
          page: page,
          rowNum: row.rowNum,
        });
        return rowDataList;
      });
    } else {
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
    let newMultiChecked = [...multiChecked];
    let curIdx = newChecked.indexOf(row.passageId);

    let examIdx = examRowDataList
      .map((item: any) => item.passageId)
      .indexOf(row.passageId);
    if (examIdx !== -1) {
      setTotalCount(
        (totalCount) => totalCount - examRowDataList[examIdx].count
      );
      examRowDataList.splice(examIdx, 1);
    }

    newChecked.splice(curIdx, 1);
    setChecked(newChecked);

    rowDataList.splice(curIdx, 1);
    setRowDataList((rowDataList: any) => {
      return rowDataList;
    });

    console.log(prevRowId);
    console.log(row);

    let uniqueKey =
      row.passageType + row.passageYear + row.passageName + row.page;
    let multiCheckboxIdx = newMultiChecked.indexOf(uniqueKey + row.passageUnit);

    if (multiCheckboxIdx !== -1) {
      newMultiChecked.splice(multiCheckboxIdx, 1);
    }

    let masterCheckboxId = newMultiChecked.indexOf(uniqueKey + "all");
    if (masterCheckboxId !== -1) {
      newMultiChecked.splice(masterCheckboxId, 1);
    }

    let prevRowIdx = prevRowId[uniqueKey].indexOf(row.rowNum);
    if (prevRowIdx !== -1) {
      prevRowId[uniqueKey].splice(prevRowIdx, 1);
    }

    setMultiChecked(newMultiChecked);

    forceUpdate(); // 컴포넌트 재 랜더링
  };

  // row multi check event
  function multiCheckboxClick() {
    checkAll(getCheckedMultiRowId());
  }

  // checked된 multi checkbox id return
  function getCheckedMultiRowId() {
    const masterNode = document.querySelector(
      `input[type=checkbox][data-type=all]`
    ) as HTMLInputElement;

    const multiNodes = document.querySelectorAll(
      `input[type=checkbox][data-type=multi]`
    ) as NodeListOf<HTMLInputElement>;

    let param = [];

    for (let i = 0; i < multiNodes.length; i++) {
      if (multiNodes[i].checked) {
        let rowId = multiNodes[i].dataset.rowid as string;
        param.push(parseInt(rowId));
      }
    }

    return param;
  }

  // master check box 상태 변경
  function changeMasterCheckbox(newMultiChecked: any) {
    const masterNode = document.querySelector(
      `input[type=checkbox][data-type=all]`
    ) as HTMLInputElement;

    const masterIdx = newMultiChecked.indexOf(masterNode.id);

    const multiNodes = document.querySelectorAll(
      `input[type=checkbox][data-type=multi]`
    ) as NodeListOf<HTMLInputElement>;

    let flag = true;
    for (let i = 0; i < multiNodes.length; i++) {
      if (newMultiChecked.indexOf(multiNodes[i].id) === -1) {
        // master check box 체크 해제
        flag = false;
        break;
      }
    }

    if (flag) {
      masterNode.checked = true;
      if (masterIdx === -1) {
        newMultiChecked.push(masterNode.id);
      }
    } else {
      masterNode.checked = false;
      if (masterIdx !== -1) {
        newMultiChecked.splice(masterIdx, 1);
      }
    }

    setMultiChecked(newMultiChecked);
  }

  // master multi check event
  function masterMultiCheck(event: any) {
    const multiNodes = document.querySelectorAll(
      `input[type=checkbox][data-type=multi]`
    ) as NodeListOf<HTMLInputElement>;

    if (!event.target.checked) {
      checkAll([]);
      for (let i = 0; i < multiNodes.length; i++) {
        multiNodes[i].checked = false;
      }
    } else {
      let param = [];

      for (let i = 0; i < multiNodes.length; i++) {
        let rowId = multiNodes[i].dataset.rowid as string;
        param.push(parseInt(rowId));
        multiNodes[i].checked = true;
      }

      checkAll(param);
    }
  }

  // 전체 checkbox id return
  function getMasterCheckboxId() {
    return getUniqueKey() + "all";
  }

  // one row multi checkbox id return
  function getUnitCheckboxId(unitName: any) {
    return getUniqueKey() + unitName;
  }

  function getUniqueKey() {
    return searchPassage + searchYear + passageName + page;
  }

  // 문제 유형에 따라 오른쪽 박스에 담는다
  function putList() {
    let nodes = getQuestionType();

    let checkedQuestionType = Array.from(nodes)
      .filter((node) => node.checked)
      .map((node) => node.value);

    let tempPassageIds = rowDataList.map((rowData: any) => rowData.passageId);

    let passageIds = [] as any;

    // 이미 오른쪽 사이드 박스에 있는 id 제거
    let examPassageIdList = examRowDataList.map((item: any) => item.passageId);
    // debugger;
    for (let i = 0; i < tempPassageIds.length; i++) {
      if (examPassageIdList.indexOf(tempPassageIds[i]) === -1) {
        passageIds.push(tempPassageIds[i]);
      }
    }

    let param = {
      questionTypes: checkedQuestionType,
      passageIds: passageIds,
    };

    $POST("api/v1/exam/find/question-info", param, (res: any) => {
      console.log(`question info res ::`, res);
      // debugger;

      res.data.forEach((questionInfo: any) => {
        for (let i = 0; i < rowDataList.length; i++) {
          if (
            rowDataList[i].passageId === questionInfo.passageId &&
            questionInfo.count !== 0
          ) {
            examRowDataList.push({
              passageType: rowDataList[i].searchPassage,
              passageYear: rowDataList[i].passageYear,
              passageName: rowDataList[i].passageName,
              passageNumber: rowDataList[i].passageNumber,
              passageId: rowDataList[i].passageId,
              passageUnit: rowDataList[i].passageUnit,
              page: rowDataList[i].page,
              rowNum: rowDataList[i].rowNum,
              questionIds: questionInfo.questionIds,
              count: questionInfo.count,
            });

            setTotalCount((totalCount) => totalCount + questionInfo.count);
            break;
          }
        }
      });

      forceUpdate(); // 컴포넌트 재 랜더링

      //     setRowDataList([]);
    });
  }

  // 문제 유형들 return
  function getQuestionType() {
    return document.querySelectorAll(
      "input[type=checkbox][name=questionType]"
    ) as NodeListOf<HTMLInputElement>;
  }

  // reset 누르면 questionType 전부 check되게 변경
  function defaultQuestionType() {
    let nodes = getQuestionType();

    nodes.forEach((node) => {
      if (!node.checked) {
        node.click();
      }
    });
    return QUESTIONTYPE;
  }

  // selectbox 선택시 출력되는 그리드
  const columns: GridColDef[] = [
    {
      field: "multiCheck",
      // headerName: "",
      renderHeader: () => (
        <input
          className="multi-checkbox"
          type="checkbox"
          id={getMasterCheckboxId()}
          data-type={"all"}
          onChange={(event) => masterMultiCheck(event)}
          checked={multiChecked.indexOf(getMasterCheckboxId()) !== -1} // 다른 화면 갓다와도 체크되게 함
        />
      ),
      width: 150,
      editable: false,
      align: "center",
      sortable: false,
      headerAlign: "center",
      type: "actions",
      getActions: (params: any) => [
        <>
          <input
            className="multi-checkbox"
            type="checkbox"
            id={getUnitCheckboxId(params.row.passageUnit)}
            data-type={"multi"}
            data-rowid={params.id}
            onChange={multiCheckboxClick}
            checked={
              multiChecked.indexOf(
                getUnitCheckboxId(params.row.passageUnit)
              ) !== -1
            } // 다른 화면 갓다와도 체크되게 함
          />
        </>,
      ],
    },
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
      width: 400,
      type: "actions",
      editable: false,
      headerAlign: "center",
      getActions: (params) => [
        <>
          {params.row.passageInfo.map((row: any) => {
            row.rowNum = params.id;
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
                  checked={checked.indexOf(row.passageId) !== -1} // 다른 화면 갓다와도 체크되게 함
                />
                {row.passageNumber}
              </div>
            );
          })}
        </>,
      ],
      align: "center",
    },
    {
      field: "questionCount",
      headerName: "문제수",
      width: 250,
      editable: false,
      align: "center",
      sortable: false,
      headerAlign: "center",
      type: "actions",
      getActions: (params) => [<>{params.row.questionCount}</>],
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
          시험지 제작
        </Typography>
        <div className="grid-flex">
          <div className="css-with80">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%", paddingBottom: "40px" }}>
                <Box>
                  <Grid container spacing={0} className="table-container">
                    <Grid xs={1.5} item={true}>
                      <div className="table-title table-top ">교재유형</div>
                    </Grid>
                    <Grid xs={2.5} item={true}>
                      <div className="table-content table-top">
                        <FormControl className="table-select table-select-sub">
                          <InputLabel id="demo-simple-select-label">
                            지문유형
                          </InputLabel>
                          <Select
                            value={searchPassage}
                            onChange={handlePassage}
                            labelId="demo-simple-select-label"
                            label="지문유형"
                          >
                            {PASSAGETYPE.map((text, id) => (
                              <MenuItem key={id} value={text}>
                                {text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid xs={1} item={true}>
                      <div className="table-title table-top">년도</div>
                    </Grid>
                    <Grid xs={2} item={true}>
                      <div className="table-content table-top">
                        <FormControl className="table-select table-select-sub">
                          <InputLabel id="demo-simple-select-label">
                            년도
                          </InputLabel>
                          <Select
                            value={searchYear}
                            onChange={handleYear}
                            labelId="demo-simple-select-label"
                            label="년도"
                          >
                            {YEAR.map((text, id) => (
                              <MenuItem key={id} value={text}>
                                {text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid xs={1} item={true}>
                      <div className="table-title table-top">교재</div>
                    </Grid>
                    <Grid xs={4} item={true}>
                      <div className="table-content table-top">
                        <FormControl className="table-select table-select-sub">
                          <InputLabel id="demo-simple-select-label">
                            교재명
                          </InputLabel>
                          <Select
                            value={passageName}
                            onChange={handlePassageName}
                            labelId="demo-simple-select-label"
                            label="교재명"
                          >
                            {searchTextBook.map((text, id) => (
                              <MenuItem key={id} value={text}>
                                {text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid xs={1.5} item={true}>
                      <div className="table-title" style={{ height: "160px" }}>
                        유형
                      </div>
                    </Grid>
                    <Grid xs={10.5} item={true}>
                      <div
                        className="table-content"
                        style={{ height: "160px" }}
                      >
                        {Object.entries(QUESTIONTYPE).map(([type, text]) => (
                          <div
                            key={type}
                            style={{
                              display: "inline-flex",
                              width: "130px",
                              paddingTop: "5px",
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked
                                  style={{ padding: "0" }}
                                  value={type}
                                  name={"questionType"}
                                />
                              }
                              label={text}
                              style={{ margin: "0 5px" }}
                            />
                          </div>
                        ))}
                      </div>
                    </Grid>
                  </Grid>
                  <Button
                    variant="text"
                    sx={{ float: "right", color: "gray", display: "block" }}
                    onClick={() => {
                      setSearchYear("");
                      setSearchPassage("");
                      setSearchTextBook([]);
                      defaultQuestionType();
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
              {/* 지문선택 */}
              <DataGrid
                rows={rowData}
                columns={columns}
                hideFooter={true}
                hideFooterPagination={true}
                sx={
                  rowData.length > 0
                    ? {
                        fontWeight: "500",
                        fontSize: "15px",
                        height: "100%",
                        display: "block",
                      }
                    : {
                        fontWeight: "500",
                        fontSize: "15px",
                        height: "500px",
                        display: "block",
                      }
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
            <div onClick={putList}>
              <CustomButton label={"담기"} type={"true"} />
            </div>
          </div>
          <div className="css-margin-left100 ">
            <QuestionList
              width={360}
              height={600}
              rowData={examRowDataList}
              buttonName={params.Children}
              removeRow={removeCheckBox}
              isExam={true}
              totalCnt={totalCount}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExamCrt;
