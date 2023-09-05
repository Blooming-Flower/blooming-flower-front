import { Fade, useScrollTrigger } from "@mui/material";
import React from "react";

const TransitionFade = (props: FadeTransition) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: props.threshold * 100,
    target: window,
  });
  return (
    <Fade appear={false} in={trigger} timeout={props.time || 1500}>
      <div>{props.children}</div>
    </Fade>
  );
};

export default TransitionFade;
