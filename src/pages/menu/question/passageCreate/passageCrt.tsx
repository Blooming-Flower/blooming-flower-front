import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRef, useState } from "react";
import CustomButton from "@components/ui/button/custeomButton";
import { PASSAGETYPE } from "@common/const";
import { YEAR } from "@common/const";
import { StyledTextarea } from "@components/ui/text/textarea";
import { $POST } from "@utils/request";
import { getRowContainerTypeForName } from "ag-grid-community";

const PassageCrt = () => {
  const [year, setYear] = React.useState("");
  const [name, setName] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [num, setNumber] = React.useState("");
  const [content, setContent] = React.useState("");
  const [passageType, setPassageType] = React.useState("");
  const [able, setAble] = useState("");
  const handleClick = (type: string) => {
    switch(type){
      case '교과서': setPassageType('TEXT_BOOK'); break;
      case '모의고사': setPassageType('MOCK_TEST'); break;
      case 'EBS': setPassageType('EBS'); break;
      case '부교재': setPassageType('SUB_TEXT_BOOK'); break;
      default : setPassageType('OUT_SIDE_PASSAGE');
    }
    console.log(type);
    setAble(type);
  };

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

  // @ts-ignore
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
                <FormControl className="table-select">
                  <Select
                    value={name}
                    onChange={(e) => setName(e.target.value as string)}
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
