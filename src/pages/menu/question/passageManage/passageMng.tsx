import Layout from "@components/layouts/layout";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
import { YEAR } from "@common/const";
import PassagePopup from "@pages/menu/question/passageManage/passagePopup";
import { ChangeEvent, useRef } from "react";
import { $GET } from "@utils/request";
import { debounce } from "@utils/useDebounce";
import { customTheme } from "@pages/menu/question/passageManage/customThemePsg";
import { addId } from "@utils/functions";

const PassageMng = () => {
  const outerTheme = useTheme();
  let yearData: string;
  const [year, setYear] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const popupRef: any = useRef();

  //년도 체인지 이벤트
  const handleYear = async (event: SelectChangeEvent) => {
    yearData = event.target.value as string;
    setYear(yearData);
    document.querySelector("#outlined-basic")!.innerHTML = "";
    await $GET(
      "/api/v1/passage/search/list?page=" +
        page.toString() +
        "&size=10&passageYear=" +
        yearData,
      (res: any) => {
        setData(addId(res, yearData));
      }
    );
  };
  // 교재명 체인지 이벤트
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (year != "")
      await $GET(
        "/api/v1/passage/search/list?page=" +
          page.toString() +
          "&size=10&passageYear=" +
          year +
          "&passageName=" +
          e.target.value,
        (res: any) => {
          if(res.data.content.length != 0) {
            for (let i = 0; i < res.data.content.length; i++) {
              console.log(year);
              setData(addId(res, year));
            }
          } else setData([]);
        }
      );
  };
  const debouncedOnChange = debounce<typeof handleChange>(handleChange, 500);
  const handleClickOpen = () => {
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
      getActions: (params) => [
        <Button
          variant="outlined"
          color="warning"
          size="medium"
          onClick={handleClickOpen}
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
            <Button variant="outlined" color="error" size="large">
              삭제
            </Button>
          </Box>
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
        </Box>
      </div>
      <PassagePopup ref={popupRef} />
    </Layout>
  );
};

export default PassageMng;
