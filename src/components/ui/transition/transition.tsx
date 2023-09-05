import { Slide, useScrollTrigger } from "@mui/material";
import React from "react";

const Transition = (props: Transition) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: props.threshold * 100,
    target: window,
  });

  const callTransitionend = () => {
    props.callFunc();
  };

  const callAddEndListener = (node: HTMLElement) => {
    node.addEventListener("transitionend", callTransitionend, false);
  };

  return (
    <Slide
      appear={false}
      direction={props.direction}
      in={trigger}
      timeout={props.time || 1500}
      addEndListener={props.isEndListener ? callAddEndListener : undefined}
    >
      <div>{props.children}</div>
    </Slide>
  );
};

export default Transition;
