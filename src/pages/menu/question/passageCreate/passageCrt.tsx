import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  Box, Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import CustomButton from "@components/ui/button/custeomButton";
import { PASSAGETYPE } from "@common/const";
import { YEAR } from "@common/const";
import TextareaIntroduction from "@components/ui/text/textarea";

const PassageCrt = () => {
  const [year, setYear] = React.useState("");
  const [able, setAble] = useState("");

  const handleClick = (type: string) => {
    console.log(type);
    setAble(type);
  };
  const handleYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  return (
    <Layout>
      <div className="mainCont">
        <Typography
          variant="h2"
          sx={{ fontWeight: "500", color: "#ff8b2c", paddingBottom: "20px" }}
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
                    onChange={handleYear}
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
                    value={year}
                    onChange={handleYear}
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
                    value={year}
                    onChange={handleYear}
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
                    value={year}
                    onChange={handleYear}
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
        <Button variant="text" sx={{float:'right', color:'gray'}}>Reset</Button>
        <TextareaIntroduction />
        <CustomButton label={"저장"} type={"true"} />
      </div>
    </Layout>
  );
};

export default PassageCrt;
