import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
    Autocomplete,
    Box, Button, Checkbox,
    FormControl, FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider, useTheme
} from "@mui/material";
import {QUESTIONTYPE, YEAR} from "@common/const";
import {customTheme} from "@pages/menu/question/passageManage/customThemePsg";
import {debounce} from "@utils/useDebounce";
import {ChangeEvent, useState} from "react";
import {$GET} from "@utils/request";
import QuestionList from "@pages/menu/question/questionCreate/questionList";
import CustomButton from "@components/ui/button/custeomButton";

const ExamCrt = () => {
    const outerTheme = useTheme();
    const [clear, setClear] = React.useState("");
    const [year, setYear] = React.useState("");
    const [name, setName] = React.useState("");
    const [dataName, setDataName] = React.useState([]);
    const [passageType, setPassageType] = React.useState("P1");
    const [rowData, setRowData] = React.useState([] as any);
    const [checked, setChecked] = React.useState([] as any);
    //questionList 에 넘겨줄 rowData
    const [rowDataList, setRowDataList] = React.useState([] as any);
    //지문타입별 교재 SELECT
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        if(e.target.value != "")
            $GET(
                "/api/v1/passage/search/name?passageType=" +
                passageType +
                "&passageName=" +
                e.target.value,
                (res: any) => {
                    setDataName(res.data);
                }
            );
    };

    const debouncedOnChange = debounce<typeof handleChange>(handleChange, 200);

  return (
    <Layout>
      <div className="mainCont">
        <Typography
          variant="h2"
          className="menu-title"
          sx={{ color: "#ff8b2c"}}
        >
          시험지제작
        </Typography>
          <div style={{display:'flex'}}>
          <Box>
              <Grid container spacing={0} className="table-container">
                  <Grid xs={1} item={true}>
                      <div className="table-title table-top">연도</div>
                  </Grid>
                  <Grid xs={5} item={true}>
                      <div className="table-content table-top">
                          <FormControl className="table-select">
                              <InputLabel id="demo-simple-select-label">연도</InputLabel>
                              <Select
                                  value={year}
                                  onChange={(e) => setYear(e.target.value as string)}
                                  displayEmpty
                                  inputProps={{ "aria-label": "Without label" }}
                                  label="연도"
                              >
                                  {YEAR.map((text, id) => (
                                      <MenuItem key={id} value={text} >
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
                  <Grid xs={5} item={true}>
                      <div className="table-content table-top">
                          <FormControl className="table-input-select">
                              <ThemeProvider theme={customTheme(outerTheme)}>
                                  <Autocomplete
                                      onChange={(e,v:any)=>setName(v)}
                                      key={clear}
                                      disablePortal
                                      id="combo-box-demo"
                                      freeSolo
                                      getOptionLabel={(option) =>
                                          option ? option : ""
                                      }
                                      isOptionEqualToValue={(option, value) =>
                                          option === value
                                      }
                                      options={dataName}
                                      renderOption={(props, option) => {
                                          return (
                                              <li
                                                  {...props}
                                                  key={option}
                                                  style={{ backgroundColor: "white" }}
                                              >
                                                  {option}
                                              </li>
                                          );
                                      }}
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              onChange={debouncedOnChange}
                                              label="교재명"
                                          />
                                      )}
                                  />
                              </ThemeProvider>
                          </FormControl>
                      </div>
                  </Grid>
                  <Grid xs={1} item={true}>
                      <div className="table-title" style={{height:'160px'}}>유형</div>
                  </Grid>
                  <Grid xs={11} item={true}>
                      <div className="table-content" style={{height:'160px'}}>
                          {Object.entries(QUESTIONTYPE).map(([type, text]) => (
                              <div key={type} style={{display:'inline-block', width:'150px', height:'10px'}}>
                                  <FormControlLabel control={<Checkbox value={type} style={{float:'left'}} defaultChecked/>} label={text} style={{margin:'0 10px'}}/>
                              </div>
                          ))}
                      </div>
                  </Grid>
              </Grid>
              <div>
                  <Button
                      variant="text"
                      sx={{ float: "right", color: "gray" }}
                      onClick={() => {
                      }}
                  >
                      Reset
                  </Button>
                  <CustomButton label={"담기"} type={"true"} />
              </div>
          </Box>
              <div className="css-margin-left100 ">
                  <QuestionList
                      width={360}
                      height={600}
                      rowData={[1]}
                      setRowData={setRowDataList}
                      checked={checked}
                      setChecked={setChecked}
                      isExam={true}
                  />
              </div>
          </div>
      </div>
    </Layout>
  );
};

export default ExamCrt;
