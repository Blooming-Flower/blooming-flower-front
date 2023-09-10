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
import { useRef } from "react";

const PassageMng = () => {
  const outerTheme = useTheme();
  const [book, setBook] = React.useState("");
  const [page, setPage] = React.useState(0);
  const popupRef: any = useRef();
  const handleBook = (event: SelectChangeEvent) => {
    setBook(event.target.value as string);
  };

  const handleClickOpen = () => {
    popupRef.current.handleOpen();
  };

  const columns: GridColDef[] = [
    { field: "year", headerName: "연도", width: 90 },
    {
      field: "name",
      headerName: "교재명",
      width: 150,
      editable: true,
    },
    {
      field: "chapter",
      headerName: "강",
      width: 150,
      editable: true,
    },
    {
      field: "num",
      headerName: "번호",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "count",
      headerName: "문제 수",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "수정",
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
                value={book}
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
                  pageSize: 5,
                },
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooterPagination={true}
            sx={{ fontWeight: "300" }}
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
            "--TextField-brandBorderColor": "#E0E3E7",
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
