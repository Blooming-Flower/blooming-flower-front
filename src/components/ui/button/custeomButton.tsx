import { Button } from "@mui/material";
import * as React from "react";

const CustomButton = (props: { label: string; type: string, borderType?:string}) => {
  return (
      props.borderType == 'round' ?
    <Button
      color="warning"
      size="large"
      variant="contained"
      value={props.label}
      disabled={props.label != props.type}
      sx={{ height: "40px", borderRadius:'20px', fontSize:'15px' }}
    >
      {props.label}
    </Button> :
    <Button
        color="warning"
        size="large"
        variant="contained"
        value={props.label}
        sx={{ height: "40px", borderRadius:'10px', fontSize:'15px', float:'right' }}
    >
      {props.label}
    </Button>
  );
};
export default CustomButton;
