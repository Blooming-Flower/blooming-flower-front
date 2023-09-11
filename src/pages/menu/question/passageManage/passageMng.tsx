import Layout from "@components/layouts/layout";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  createTheme,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  outlinedInputClasses,
  Pagination,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { YEAR } from "@common/const";
import PassagePopup from "@pages/menu/question/passageManage/passagePopup";
import {ChangeEvent, useRef} from "react";
import { $GET } from "@utils/request";
import {debounce} from "@utils/useDebounce";



const PassageMng = () => {
  const outerTheme = useTheme();
  let yearTest:string
  const [year, setYear] = React.useState("");
  const [page, setPage] = React.useState(0);
  const popupRef: any = useRef();

  const handleBook = (event: SelectChangeEvent) => {
    yearTest = event.target.value as string
    setYear(yearTest)
    console.log(yearTest)
    $GET(
      "/api/v1/passage/search/list?page=?" +
        page.toString() +
        "&size=10&passageYear=" +
        yearTest,
      (res: any) => {
        console.log(res);
      }
    );
  };
const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
  $GET(
      "/api/v1/passage/search/list?page=?" +
      page.toString() +
      "&size=10&passageYear=" +
      year+'&passageName='+e.target.value,
      (res: any) => {
        console.log(res);
      }
  );
}
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
    },
    {
      field: "name",
      headerName: "교재명",
      headerAlign: "center",
      width: 300,
      editable: true,
      align: "center",
    },
    {
      field: "chapter",
      headerName: "강",
      headerAlign: "center",
      width: 150,
      editable: true,
      align: "center",
    },
    {
      field: "num",
      headerName: "번호",
      headerAlign: "center",
      type: "string",
      width: 110,
      editable: true,
      align: "center",
    },
    {
      field: "count",
      headerName: "문제 수",
      headerAlign: "center",
      sortable: false,
      width: 160,
      editable: true,
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "수정",
      headerAlign: "center",
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
                onChange={handleBook}
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
            rows={rows}
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
        </Box>
      </div>
      <PassagePopup ref={popupRef} />
    </Layout>
  );
};

export default PassageMng;
/********************************************** 스타일 ***************************************************/
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "rgba(0,0,0,0.23)",
            "--TextField-brandBorderHoverColor": "#040404",
            "--TextField-brandBorderFocusedColor": "#ffc23b",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });
