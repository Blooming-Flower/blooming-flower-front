import Layout from "@components/layouts/layout";
import * as React from "react";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Button,
  createTheme,
  FormControl, IconButton,
  InputLabel,
  MenuItem,
  outlinedInputClasses,
  Pagination,
  Select,
  SelectChangeEvent, styled,
  TextField,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {YEAR} from "@common/const"


const PassageMng = () => {
  const outerTheme = useTheme();
  const [book, setBook] = React.useState("");
  const [page, setPage] = React.useState(0);


  const handleBook = (event: SelectChangeEvent) => {
    setBook(event.target.value as string);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            <Button variant="outlined" color="warning" size="medium" onClick={handleClickOpen}>
              수정
            </Button>
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
          sx={{ fontWeight: "500", color: "#ff8b2c", paddingBottom: "20px" }}
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
      <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));