import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select, TextField, ThemeProvider, useTheme,
} from "@mui/material";
import {ChangeEvent, useState} from "react";
import CustomButton from "@components/ui/button/custeomButton";
import { PASSAGETYPE } from "@common/const";
import { YEAR } from "@common/const";
import { StyledTextarea } from "@components/ui/text/textarea";
import {$GET, $POST} from "@utils/request";
import {customTheme} from "@pages/menu/question/passageManage/customThemePsg";
import {debounce} from "@utils/useDebounce";

const PassageCrt = () => {
  let nameList : {
    label: any;
  }[]
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
  const savePassage = async () => {
    await $POST(
      "api/v1/passage/save",
      {
        'passageType': passageType,
        'passageYear': year,
        'passageName': name,
        'passageUnit': unit,
        'passageNumber': num,
        'passageContent': content,
      },
      (res: any) => {
        console.log(res);
      }
    );
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      await $GET(
          "/api/v1/passage/search/name?passageType=" +
          passageType +
          "&passageName=" +
          e.target.value,
          (res: any) => {
            if (res.data.length != 0) {
              setDataName(res.data)
            }
          }
      );
      console.log(e.target.value)
    setName(e.target.value)
  };
  const debouncedOnChange = debounce<typeof handleChange>(handleChange, 500);
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
                        options={dataName}
                        sx={{ width: 300 }}
                        renderInput={(temp) => <TextField {...temp} onChange={debouncedOnChange} label="교재명" />}
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
                    onChange={(e) => setNumber(e.target.value as string)}
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
        <div onClick={savePassage}>
          <CustomButton label={"저장"} type={"true"} />
        </div>
      </div>
    </Layout>
  );
};

export default PassageCrt;
