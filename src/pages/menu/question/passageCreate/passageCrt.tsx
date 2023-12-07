import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { ALERT, TXTBOOK, TXTNUM, TXTUNIT } from "@common/const";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CustomButton from "@components/ui/button/custeomButton";
import { PASSAGETYPE } from "@common/const";
import { YEAR } from "@common/const";
import { StyledTextarea } from "@components/ui/text/textarea";
import { $DELETE, $GET, $POST, $PUT } from "@utils/request";
import { customTheme } from "@pages/menu/question/passageManage/customThemePsg";
import { debounce } from "@utils/useDebounce";
import { checkPassage, savePassage } from "@utils/callApi";
import SimpleBackdrop from "@components/ui/progress/progress";
import { copyNodeList } from "ag-grid-community/dist/lib/utils/dom";
import { alert } from "@utils/alert";
import { coerceBooleanProperty } from "swiper/angular/angular/src/utils/utils";
interface filterOptionType {
  passageId: number;
  passageName: string;
}
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: filterOptionType) => option.passageName,
});
const PassageCrt = () => {
  const outerTheme = useTheme();
  const Ref = useRef<any>();
  const [check, setCheck] = React.useState("");
  const [txtUnit, setTxtUnit] = React.useState<string[]>(TXTUNIT.P1);
  const [txtNum, setTxtNum] = React.useState<string[]>(TXTNUM.P1);
  const [clear, setClear] = React.useState("");
  const [year, setYear] = React.useState("");
  const [name, setName] = React.useState("");
  const [dataName, setDataName] = React.useState([]);
  const [unit, setUnit] = React.useState("");
  const [num, setNumber] = React.useState("");
  const [content, setContent] = React.useState("");
  const [passageType, setPassageType] = React.useState("P1");
  const [able, setAble] = useState("교과서");
  const handleClick = (type: string) => {
    setUnit("");
    setNumber("");
    switch (type) {
      case "교과서":
        setPassageType("P1");
        setTxtUnit(TXTUNIT.P1);
        setTxtNum(TXTNUM.P1);
        break;
      case "모의고사":
        setPassageType("P2");
        setTxtUnit(TXTUNIT.P2);
        setTxtNum(TXTNUM.P2);
        break;
      case "EBS(고3) (1)":
        setPassageType("P3");
        setTxtUnit(TXTUNIT.P3);
        setTxtNum(TXTNUM.P3);
        break;
      case "EBS(고3) (2)":
        setPassageType("P4");
        setTxtUnit(TXTUNIT.P4);
        setTxtNum(TXTNUM.P4);
        break;
      case "부교재":
        setPassageType("P5");
        setTxtUnit(TXTUNIT.P5);
        setTxtNum(TXTNUM.P5);
        break;
      default:
        setPassageType("P6");
        setTxtUnit(TXTUNIT.P6);
        setTxtNum(TXTNUM.P6);
    }
    setAble(type);
  };
  //지문저장
  const save = () => {
    if (check == "") {
      $POST(
        "api/v1/passage/save",
        {
          passageType: passageType,
          passageYear: year,
          passageName: name,
          passageUnit: unit,
          passageNumber: num,
          passageContent: content,
        },
        (res: any) => {
          alert.icon({
            type: ALERT.SUCCESS,
            text: "지문이 저장 되었습니다.",
          });
        }
      );
    } else {
      $PUT(
        "/api/v1/passage/update",
        {
          passageId: check,
          passageType: passageType,
          passageYear: year,
          passageName: name,
          passageUnit: unit,
          passageNumber: num,
          passageContent: content,
        },
        (res: any) => {
          alert.icon({
            type: ALERT.SUCCESS,
            text: "지문이 수정 되었습니다.",
          });
        }
      );
    }
  };
  //지문 중복체크
  useEffect(() => {
    if (num != "")
      $GET(
        "/api/v1/passage/check/exist/passage?passageType=" +
          passageType +
          "&passageYear=" +
          year +
          "&passageName=" +
          name +
          "&passageUnit=" +
          unit +
          "&passageNumber=" +
          num,
        (res: any) => {
          console.log(res);
          if (res.data.passageContent != "" && res.data != "") {
            Ref.current.value = res.data.passageContent;
            setContent(res.data.passageContent);
            setCheck(res.data.passageId);
            console.log(content);
          } else {
            Ref.current.value = "";
            setContent("");
            setCheck("");
          }
        }
      );
  }, [num]);
  //지문타입별 교재 SELECT
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value != "")
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
          sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
        >
          지문 저장
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
                <FormControl className="table-select table-select-sub">
                  <InputLabel id="demo-simple-select-label">연도</InputLabel>
                  <Select
                    value={year}
                    onChange={(e) => setYear(e.target.value as string)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="연도"
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
                <FormControl className="table-input-select table-select-sub">
                  <ThemeProvider theme={customTheme(outerTheme)}>
                    <Autocomplete
                      onChange={(e, v: any) => setName(v)}
                      key={clear}
                      disablePortal
                      id="combo-box-demo"
                      freeSolo
                      getOptionLabel={(option) => (option ? option : "")}
                      isOptionEqualToValue={(option, value) => option === value}
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
            <Grid xs={2} item={true}>
              <div className="table-title">강</div>
            </Grid>
            <Grid xs={4} item={true}>
              <div className="table-content">
                <FormControl className="table-select table-select-sub">
                  <InputLabel id="demo-simple-select-label">강</InputLabel>
                  <Select
                    defaultValue={""}
                    value={unit || ""}
                    onChange={(e) => setUnit(e.target.value as string)}
                    displayEmpty
                    label="강"
                  >
                    {txtUnit.map((text, id) => (
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
                <FormControl className="table-select table-select-sub">
                  <InputLabel id="demo-simple-select-label">번호</InputLabel>
                  <Select
                    defaultValue={""}
                    value={num || ""}
                    onChange={(e) => setNumber(e.target.value)}
                    displayEmpty
                    label="번호"
                  >
                    {txtNum.map((text, id) => (
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
            setDataName([]);
            setNumber("");
            setName("");
            setYear("");
            setUnit("");
            setAble("교과서");
            setTxtUnit(TXTUNIT.P1);
            setTxtNum(TXTNUM.P1);
            setClear(() => (clear == "" ? "clear" : ""));
          }}
        >
          Reset
        </Button>
        <StyledTextarea
          ref={Ref}
          minRows={10}
          maxRows={20}
          aria-label="maximum height"
          style={{ resize: "none", height: 236 }}
          placeholder="지문"
          className="passage-text"
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              e.currentTarget.setRangeText("\t");
              const point = e.currentTarget.selectionStart + 1;
              e.currentTarget.setSelectionRange(point, point);
            }
          }}
        />
        <div onClick={save}>
          <CustomButton label={"저장"} type={"true"} />
        </div>
      </div>
    </Layout>
  );
};

export default PassageCrt;
