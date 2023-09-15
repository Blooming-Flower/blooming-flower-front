import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";

const QuestionTab = () => {
  return (
    <Layout>
      <div className="mainCont">
        <Typography
          variant="h2"
          className="menu-title"
          sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
        >
          문제출제 토스트 UI
        </Typography>
      </div>
    </Layout>
  );
};

export default QuestionTab;
