import Typography from "@mui/material/Typography";
import * as React from "react";
import Layout from "@components/layouts/layout";
import {
    Box, Card, Divider, FormControl, Grid, IconButton, List, ListItem, TextField,
} from "@mui/material";
import {EXAMTYPE, PASSAGETYPE, QUESTIONTYPE, TXTNUM, TXTUNIT, YEAR} from "@common/const";
import MenuIcon from '@mui/icons-material/Menu';
import CustomButton from "@components/ui/button/custeomButton";
import {useCallback, useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const ExamView = () => {
    const [rowData, setRowData] = useState([
        { id: "1", passageYear: "2022", passageName:'교재1',passageUnit:'2', passageNumber:'1-12'},
        { id: "2", passageYear: "2022", passageName:'교재2',passageUnit:'3', passageNumber:'1-12'},
        { id: "3", passageYear: "2023", passageName:'교재3',passageUnit:'4', passageNumber:'1-12'},
        { id: "4", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "5", passageYear: "2025", passageName:'교재5',passageUnit:'6', passageNumber:'1-12'},
        { id: "6", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "7", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "8", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "9", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "10", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "11", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "12", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "13", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'},
        { id: "14", passageYear: "2024", passageName:'교재4',passageUnit:'5', passageNumber:'1-12'}
    ])
    const [examTitle, setExamTitle] = useState('')
    const [header, setHeader] = useState('')
    const [leftBottom, setLeftBottom] = useState('')
    const [rightBottom, setRightBottom] = useState('')
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
    const handleChange = (result:any) => {
        if (!result.destination) return;
        console.log(result);
        const items = [...rowData];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setRowData(items)
        console.log(items)
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
                                                <FormControl className="table-input-select">
                                                    <TextField
                                                        onChange={(e) => setExamTitle(e.target.value)}
                                                        label="Title을 입력하세요."
                                                        value={examTitle}
                                                    />
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid xs={1.5} item={true}>
                                            <div className="table-title">머리말</div>
                                        </Grid>
                                        <Grid xs={4.5} item={true}>
                                            <div className="table-content">
                                                <FormControl className="table-input-select">
                                                    <TextField
                                                        onChange={(e) => setHeader(e.target.value)}
                                                        label="머리말을 입력하세요."
                                                        value={header}
                                                    />
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid xs={1.5} item={true}>
                                            <div className="table-title">꼬리말</div>
                                        </Grid>
                                        <Grid xs={4.5} item={true}>
                                            <div className="table-content">
                                                <Grid container>
                                                    <Grid item xs={1} style={{textAlign:'center',display:'flex'}}><p style={{display:'flex',alignItems:'center',paddingLeft:'10px'}}>(왼)</p></Grid>
                                                    <Grid item xs={5}>
                                                        <FormControl className="table-input-select">
                                                            <TextField
                                                                onChange={(e) => setLeftBottom(e.target.value)}
                                                                label="왼쪽"
                                                                value={leftBottom}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={1} style={{textAlign:'center',display:'flex'}}><p style={{display:'flex',alignItems:'center',paddingLeft:'10px'}}>(오)</p></Grid>
                                                    <Grid item xs={5}>
                                                        <FormControl className="table-input-select">
                                                            <TextField
                                                                onChange={(e) => setRightBottom(e.target.value)}
                                                                label="오른쪽"
                                                                value={rightBottom}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            {/* 지문선택 */}
                            <div>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: 'background.default',
                                        display: 'grid',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 2,
                                    }}
                                >
                                    시험지종류별 시험지..
                                </Card>
                            </div>
                        </Box>
                    </div>
                    <div className="css-margin-left100 ">
                        <div className="questionList-item">
                            <List
                                sx={{
                                    // maxWidth: width,
                                    width: 360,
                                    bgcolor: "background.paper",
                                    position: "relative",
                                    overflow: "auto",
                                    // maxHeight: height,
                                    height: '100%',
                                    "& ul": { padding: 0 },
                                }}
                            >
                        <DragDropContext onDragEnd={handleChange}>
                            <Droppable droppableId="todos">
                                {(provided) => (
                                    <List
                                        className="todos"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {rowData.map(({ id, passageYear,passageName,passageUnit,passageNumber }, index) => (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <>
                                                    <ListItem
                                                        ref={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                        secondaryAction={
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                            >
                                                                <MenuIcon />
                                                            </IconButton>
                                                        }
                                                    >
                                                        <div>{passageYear}</div>
                                                        <div
                                                            className="passageName"
                                                            style={{
                                                                maxWidth: 65,
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                            data-tooltip={passageName}
                                                        >
                                                            {passageName}
                                                        </div>
                                                        <div>{passageUnit}</div>
                                                        <div>{passageNumber}</div>
                                                    </ListItem>
                                                    <Divider />
                                                    </>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </List>
                                )}
                            </Droppable>
                        </DragDropContext>
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ExamView