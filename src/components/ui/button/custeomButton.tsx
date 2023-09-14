import { Button } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = (props: {
  label: string;
  type: string;
  borderType?: string | undefined;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();
  return props.borderType == "round" ? (
    <Button
      color="warning"
      size="large"
      variant="contained"
      value={props.label}
      onClick={() => navigate(props.domain!)}
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
      onClick={() => navigate(props.domain!)}
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
