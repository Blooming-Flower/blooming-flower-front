import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box } from "@mui/material";
import Fade from "@mui/material/Fade";

const HeaderTop = (props: HeaderProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
      >
        {children}
      </Box>
    </Fade>
  );
};
export default HeaderTop;
