import Layout from "@components/layouts/layout";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  useGridApiContext,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { ALERT, YEAR } from "@common/const";
import PassagePopup from "@pages/menu/question/passageManage/passagePopup";
import { ChangeEvent, useEffect, useRef } from "react";
import { $DELETE, $GET } from "@utils/request";
import { debounce } from "@utils/useDebounce";
import { customTheme } from "@pages/menu/question/passageManage/customThemePsg";
import { addId } from "@utils/functions";
import CustomNoRowsOverlay from "@components/ui/grid/customNoGrid";
import customPagination from "@components/ui/grid/customPage";
import { alert } from "@utils/alert";
declare module "@mui/x-data-grid" {
  interface PaginationPropsOverrides {
    pageCount: number;
    page: number;
    type: string;
    year: string;
    passageName: string;
    text: string;
  }
}
const PassageMng = () => {
  const apiRef = useGridApiRef();
  const [delCheck, setDelCheck] = React.useState(false);
  const outerTheme = useTheme();
  let yearData: string;
  const [popupParam, setPopupParam] = React.useState<number>();
  const [year, setYear] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [passageName, setPassageName] = React.useState("");
  const [data, setData] = React.useState([]);
  const popupRef: any = useRef();

  //년도 체인지 이벤트
  const handleYear = (event: SelectChangeEvent) => {
    yearData = event.target.value as string;
    setYear(yearData);
    document.querySelector("#outlined-basic")!.innerHTML = "";
    $GET(
      "/api/v1/passage/search/list?page=" +
        page.toString() +
        "&size=5&passageYear=" +
        yearData +
        "&passageName=" +
        passageName,
      (res: any) => {
        // debugger;
        setData(addId(res, yearData));
        setCount(res.data.totalPages);
      }
    );
  };
  // 교재명 체인지 이벤트
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (year != "")
      $GET(
        "/api/v1/passage/search/list?page=" +
          page.toString() +
          "&size=5&passageYear=" +
          year +
          "&passageName=" +
          e.target.value,
        (res: any) => {
          if (res.data.content.length != 0) {
            for (let i = 0; i < res.data.content.length; i++) {
              console.log(year);
              setData(addId(res, year));
              setCount(res.data.totalPages);
            }
          } else setData([]);
        }
      );

    setPassageName(e.target.value);
  };
  //지문삭제
  const deletePassage = () => {
    const passageTemp = apiRef.current.getSelectedRows();
    alert.confirm({
      type: ALERT.CONFIRM,
      text: "지문을 삭제\n 하시겠습니까?\n\n",
      confirmText: "확인",
      confirmCall: async () => {
        await passageTemp.forEach((value, key, map) => {
          $DELETE("/api/v1/passage/delete/" + value.passageId, (res: any) => {
            setDelCheck(!delCheck);
            apiRef.current.setRowSelectionModel([]);
          });
        });
      },
    });
  };
  //지문삭제 성공시 그리드 초기화
  useEffect(() => {
    if (year != "") {
      $GET(
        "/api/v1/passage/search/list?page=" +
          page.toString() +
          "&size=5&passageYear=" +
          year,
        (res: any) => {
          setData(addId(res, year));
        }
      );
    }
  }, [delCheck]);
  const debouncedOnChange = debounce<typeof handleChange>(handleChange, 200);
  const handleClickOpen = (passageId: number) => {
    setPopupParam(passageId);
    popupRef.current.handleOpen();
  };

  const columns: GridColDef[] = [
    {
      field: "year",
      headerName: "연도",
      width: 190,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "passageName",
      headerName: "교재명",
      headerAlign: "center",
      width: 300,
      editable: true,
      align: "center",
      sortable: false,
    },
    {
      field: "passageUnit",
      headerName: "강",
      headerAlign: "center",
      width: 150,
      editable: true,
      align: "center",
      sortable: false,
    },
    {
      field: "passageNumber",
      headerName: "번호",
      headerAlign: "center",
      type: "string",
      width: 110,
      editable: true,
      align: "center",
      sortable: false,
    },
    {
      field: "questionCount",
      headerName: "문제 수",
      headerAlign: "center",
      sortable: false,
      type: "number",
      width: 160,
      editable: true,
      align: "center",
    },
    {
      field: "passageId",
      type: "actions",
      headerName: "수정",
      headerAlign: "center",
      sortable: false,
      width: 160,
      getActions: (params: GridRowParams) => [
        <Button
          variant="outlined"
          color="warning"
          size="medium"
          onClick={() => handleClickOpen(params.row.passageId)}
        >
          수정
        </Button>,
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
          지문관리
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", paddingBottom: "20px" }}>
            <FormControl sx={{ width: "180px" }}>
              <InputLabel id="demo-simple-select-label">년도</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Year"
                onChange={handleYear}
              >
                {YEAR.map((text, id) => (
                  <MenuItem key={id} value={text}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "580px", marginLeft: "20px" }}>
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField
                  id="outlined-basic"
                  label="교재명"
                  variant="outlined"
                  onChange={debouncedOnChange}
                />
              </ThemeProvider>
            </FormControl>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={deletePassage}
            >
              삭제
            </Button>
          </Box>
          <DataGrid
            rows={data}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              pagination: customPagination,
            }}
            slotProps={{
              pagination: {
                pageCount: count,
                page: page,
                year: year,
                passageName: passageName,
                type: "passageMng",
              },
            }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            apiRef={apiRef}
            checkboxSelection
            // disableRowSelectionOnClick
            hideFooterPagination={false}
            sx={
              data.length > 0
                ? { fontWeight: "500", fontSize: "15px", height: "100%" }
                : { fontWeight: "500", fontSize: "15px", height: "400px" }
            }
          />
        </Box>
      </div>
      <PassagePopup passageId={popupParam} ref={popupRef} />
    </Layout>
  );
};

export default PassageMng;
