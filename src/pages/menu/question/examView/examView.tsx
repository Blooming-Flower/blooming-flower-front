import Layout from "@components/layouts/layout";
import Typography from "@mui/material/Typography";
import * as React from "react";

const ExamView = () => {
  return (
    <Layout>
        <div className="mainCont">
            <Typography
                variant="h2"
                className="menu-title"
                sx={{ color: "#ff8b2c", paddingBottom: "20px" }}
            >
                시험지보기
            </Typography>
        </div>
    </Layout>
  );
};

export default ExamView;
