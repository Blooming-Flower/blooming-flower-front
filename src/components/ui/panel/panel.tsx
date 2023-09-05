import { Box, Typography } from "@mui/material";

const TabPanel = (props: ITabPanelProps) => {
  const { children, value, index } = props;
  const style: React.CSSProperties = {
    position: "fixed",
    width: "100%",
    zIndex: 1,
    opacity: 0.9,
    textAlign: "center",
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={style}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
export default TabPanel;
