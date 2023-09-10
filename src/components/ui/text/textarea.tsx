import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const TextareaIntroduction = () => {
  const orange = {
    100: "#ececec",
    200: "#fff1dd",
    400: "#fde4b0",
    500: "#ffd698",
    600: "#ffc150",
    900: "#585858",
  };

  const grey = {
    50: "#DAECFF",
    100: "#DAECFF",
    200: "#bebebe",
    300: "#fff5e8",
    400: "#fde4b0",
    500: "#ffd698",
    600: "#ffc150",
    700: "#5d5d5d",
    800: "#ffb72c",
    900: "#ffb230",
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    min-width:100%;
    max-width:100%;
    max-height:450px;
    margin-top: 10px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: black;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 24px ${
      theme.palette.mode === "dark" ? orange[900] : orange[100]
    };

    &:hover {
      border-color: ${orange[400]};
    }

    &:focus {
      border-color: ${orange[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? orange[600] : orange[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <StyledTextarea
      minRows={10}
      maxRows={20}
      aria-label="maximum height"
      placeholder="지문"
    />
  );
};
export default TextareaIntroduction;
