import { Button } from "@mui/material";
import * as React from "react";

const CustomButton = (props: {
  label: string;
  type: string;
  borderType?: string | undefined;
  children?: React.ReactNode;
  domain?:string | undefined;
  onClick?: () => void;
}) => {
  return props.borderType == "round" ? (
    <Button
      color="warning"
      size="large"
      variant="contained"
      value={props.label}
      onClick={props.onClick}
      disabled={props.label != props.type}
      sx={{ height: "40px", borderRadius: "20px", fontSize: "15px" }}
    >
      {props.label}
      {props.children}
    </Button>
  ) : (
    <Button
      color="warning"
      size="large"
      variant="contained"
      value={props.label}
      onClick={props.onClick}
      sx={{
        height: "40px",
        borderRadius: "10px",
        fontSize: "15px",
        float: "right",
      }}
    >
      {props.label}
      {props.children}
    </Button>
  );
};
export default CustomButton;
