import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  Autocomplete,
  Box,
  Button, createFilterOptions,
  FormControl,
  Grid,
  MenuItem,
  Select, SelectChangeEvent, TextField, ThemeProvider, useTheme,
} from "@mui/material";
import {ChangeEvent, useState} from "react";
import CustomButton from "@components/ui/button/custeomButton";
import { PASSAGETYPE } from "@common/const";
import { YEAR } from "@common/const";
import { StyledTextarea } from "@components/ui/text/textarea";
import {$GET, $POST} from "@utils/request";
import {customTheme} from "@pages/menu/question/passageManage/customThemePsg";
import {debounce} from "@utils/useDebounce";
import {checkPassage, savePassage} from "@utils/callApi";
interface filterOptionType {
  passageId:number,
  passageName:string
}
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: filterOptionType) => option.passageName,
});
const PassageCrt = () => {
  const outerTheme = useTheme();
  const [year, setYear] = React.useState("");
  const [name, setName] = React.useState('');
  const [dataName, setDataName] = React.useState([]);
  const [unit, setUnit] = React.useState("");
  const [num, setNumber] = React.useState("");
  const [content, setContent] = React.useState("");
  const [passageType, setPassageType] = React.useState("P1");
  const [able, setAble] = useState("교과서");
  const handleClick = (type: string) => {
    switch(type){
      case '교과서': setPassageType('P1'); break;
      case '모의고사': setPassageType('P2'); break;
      case 'EBS': setPassageType('P3'); break;
      case '부교재': setPassageType('P4'); break;
      default : setPassageType('P5');
    }
    setAble(type);
  };
//지문저장
  const save =  () => {
    const res = savePassage(passageType,year,name,unit,num,content)
    console.log(res);
  };
  //지문 중복체크
const handleNum = (e:SelectChangeEvent) => {
  setNumber(e.target.value as string)
  const res = checkPassage(passageType,year,name,unit,num)
  console.log(res)
}
  //지문타입별 교재 SELECT
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value)
  $GET(
        "/api/v1/passage/search/name?passageType=" +
        passageType +
        "&passageName=" +
        e.target.value,
        (res: any) => {
          setDataName(res.data)
        }
    )
  };
  const debouncedOnChange = debounce<typeof handleChange>(handleChange, 200);
  return (
    <Layout>
      <div className="mainCont">
        <Typography
          variant="h2"
          className="menu-title"
          sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
        >
          지문저장
        </Typography>
        <Box sx={{ width: "100%", height: "40px" }}>
          <div>
            <Typography variant="h5" className="button-front">
              종류
            </Typography>
          </div>
          {PASSAGETYPE.map((text, id) => (
            <div
              key={id}
              onClick={() => handleClick(text)}
              className="button-label"
            >
              <CustomButton label={text} type={able} borderType={"round"} />
            </div>
          ))}
        </Box>
        <Box>
          <Grid container spacing={0} className="table-container">
            <Grid xs={2} item={true}>
              <div className="table-title table-top">연도</div>
            </Grid>
            <Grid xs={4} item={true}>
              <div className="table-content table-top">
                <FormControl className="table-select">
                  <Select
                    value={year}
                    onChange={(e) => setYear(e.target.value as string)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
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
            <Grid xs={2} item={true}>
              <div className="table-title table-top">교재</div>
            </Grid>
            <Grid xs={4} item={true}>
              <div className="table-content table-top">
                <FormControl sx={{ width: "580px", marginLeft: "20px" }}>
                  <ThemeProvider theme={customTheme(outerTheme)}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        filterOptions={filterOptions}
                        getOptionLabel={(option)=>option.passageName}
                        isOptionEqualToValue={(option, value) => option.passageId !== value.passageId}
                        options={dataName}
                        sx={{ width: 300 }}
                        renderOption={(props, option)=>{
                          return (<li {...props} key={option.passageId} style={{backgroundColor:'white'}}>
                            {option.passageName}
                          </li>)
                        }}
                        renderInput={(params) => <TextField {...params} onChange={debouncedOnChange} label="교재명" />}
                    />
                  </ThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid xs={2} item={true}>
              <div className="table-title">강</div>
            </Grid>
            <Grid xs={4} item={true}>
              <div className="table-content">
                <FormControl className="table-select">
                  <Select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as string)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
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
            <Grid xs={2} item={true}>
              <div className="table-title">번호</div>
            </Grid>
            <Grid xs={4} item={true}>
              <div className="table-content">
                <FormControl className="table-select">
                  <Select
                    value={num}
                    onChange={handleNum}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
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
          </Grid>
        </Box>
        <Button
          variant="text"
          sx={{ float: "right", color: "gray" }}
          onClick={() => {
            setNumber("");
            setName("");
            setYear("");
            setUnit("");
            setAble("");
          }}
        >
          Reset
        </Button>
        <StyledTextarea
          minRows={10}
          maxRows={20}
          aria-label="maximum height"
          placeholder="지문"
          className="passage-text"
          onChange={(e) => setContent(e.target.value)}
        />
        <div onClick={save}>
          <CustomButton label={"저장"} type={"true"} />
        </div>
      </div>
    </Layout>
  );
};

export default PassageCrt;
