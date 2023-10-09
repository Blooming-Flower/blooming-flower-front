import Typography from "@mui/material/Typography";
import * as React from "react";
import Layout from "@components/layouts/layout";
import {Box} from "@mui/material";
import {EXAMTYPE, TXTNUM, TXTUNIT} from "@common/const";
import CustomButton from "@components/ui/button/custeomButton";
import {useState} from "react";

const ExamView = () => {
    const [able, setAble] = useState("시험지");
    const handleClick = (type: string) => {
        switch (type) {
            case "시험지":
                break;
            case "Big Book":
                break;
        }
        setAble(type);
    };
    return (
        <Layout>
            <div className="mainCont">
                <Typography
                    variant="h2"
                    className="menu-title"
                    sx={{ color: "#ff8b2c", paddingBottom: "20px"}}
                >
                    시험지제작
                </Typography>
                <Box sx={{ width: "100%", height: "40px" }}>
                    <div>
                        <Typography variant="h5" className="button-front">
                            종류
                        </Typography>
                    </div>
                    {EXAMTYPE.map((text, id) => (
                        <div
                            key={id}
                            onClick={() => handleClick(text)}
                            className="button-label"
                        >
                            <CustomButton label={text} type={able} borderType={"round"}/>
                        </div>
                    ))}
                </Box>
            </div>
        </Layout>
    )
}
export default ExamView