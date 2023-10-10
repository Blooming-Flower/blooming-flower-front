import Typography from "@mui/material/Typography";
import * as React from "react";
import Layout from "@components/layouts/layout";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select
} from "@mui/material";
import {EXAMTYPE, PASSAGETYPE, QUESTIONTYPE, TXTNUM, TXTUNIT, YEAR} from "@common/const";
import CustomButton from "@components/ui/button/custeomButton";
import {useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import QuestionList from "@pages/menu/question/questionCreate/questionList";

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
                <div className="grid-flex">
                    <div className="css-with80">
                        <Box sx={{ width: "100%" }}>
                            <Box sx={{ width: "100%", paddingBottom: "40px" }}>
                                <Box>
                                    <Grid container spacing={0} className="table-container">
                                        <Grid xs={1.5} item={true}>
                                            <div className="table-title table-top">시험지Title</div>
                                        </Grid>
                                        <Grid xs={10.5} item={true}>
                                            <div className="table-content table-top">

                                            </div>
                                        </Grid>
                                        <Grid xs={1.5} item={true}>
                                            <div className="table-title">머리말</div>
                                        </Grid>
                                        <Grid xs={4.5} item={true}>
                                            <div className="table-content">

                                            </div>
                                        </Grid>
                                        <Grid xs={1.5} item={true}>
                                            <div className="table-title">교재</div>
                                        </Grid>
                                        <Grid xs={4.5} item={true}>
                                            <div className="table-content">

                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            {/* 지문선택 */}
                        </Box>
                    </div>
                    <div className="css-margin-left100 ">
                        <QuestionList
                            width={360}
                            height={600}
                            rowData={[]}
                            setRowData={[]}
                            isExam={true}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ExamView