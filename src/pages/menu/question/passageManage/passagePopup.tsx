import DialogTitle from "@mui/material/DialogTitle";
import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select, SelectChangeEvent,
    styled,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { alert } from '@utils/alert'
import {ALERT, ANSWERCOLUMNS, DEFAULT_QUESTION, DEFAULTANSWERROWS, QUESTIONTYPE} from '@common/const'
import {
    ForwardedRef,
    forwardRef,
    useEffect,
    useImperativeHandle, useRef, useState,
} from "react";
import Typography from "@mui/material/Typography";
import VerticalTabs from "@pages/menu/question/passageManage/passageTabs";
import { $GET } from "@utils/request";
import TuiEditor from "@components/ui/tui/toast";
import ChooseDataGrid from "@pages/menu/question/questionCreate/chooseDataGrid";
import {DataGrid, useGridApiRef} from "@mui/x-data-grid";

const PassagePopup = forwardRef(
  (props: { passageId: number | undefined }, ref: ForwardedRef<any>) => {
      const [callContent, setCallContent] = useState(false);
      const editorRef : React.MutableRefObject<any> = React.useRef();
      const chooseRef = useGridApiRef();
      const answerRef = useGridApiRef();
      const [check, setCheck] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [subContent, setSubContent] = React.useState("");
    const [listData, setListData] = React.useState([])
      const [questionType, setQuestionType] = React.useState("");
      const [questionTitle, setQuestionTitle] = React.useState("");
      const [pastYn, setPastYn] = React.useState(false);

      const changeType = (e: SelectChangeEvent<string>) => {
          const {
              target: { value },
          } = e;
          setQuestionType(value as string);
          setQuestionTitle(DEFAULT_QUESTION[value]);
      };
    useEffect( () => {
        console.log(props.passageId)
      if (props.passageId != undefined) {
        $GET("/api/v1/passage/search/" + props.passageId, (res: any) => {
            setListData(res.data.questions)
            setContent(res.data.passageContent)
            setOpen(true)
        });
      }
    }, [check]);
      useEffect(()=>{
          if(!open)
              setContent("")
          setListData([])
          setSubContent("")
          setQuestionType("")
          setQuestionTitle("")
          setPastYn(false)
          setCallContent(false)
      },[open])
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
        alert.confirm({
            type: ALERT.CONFIRM,
            text: '수정\n 하시겠습니까?\n\n',
            confirmText: '확인',
            confirmCall: () => {
                setCheck(!check);
            }
        })
    };

    useImperativeHandle(ref, () => ({
      handleOpen,
    }));
    return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{margin:'10px 0 0 10px'}} id="customized-dialog-title">
          <Typography
            component="div"
            variant="h3"
            sx={{ fontWeight: "bold", color: "#ff8b2c" }}
          >
            수정
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
            <Button
                variant="outlined"
                color="warning"
                size="medium"
                className='popup-change'
                sx={{margin:'0 50px 20px 0'}}
                onClick={handleClose}
            >
                수정
            </Button>
            <Grid container>
                <Grid item lg={2} >
                    <VerticalTabs data={listData} controlContent={setCallContent} controlContentValue={callContent} controlType={setQuestionType} controlTypeValue={questionType} controlSubTitle={setQuestionTitle} editor={editorRef} controlPastYn={setPastYn}/>
                </Grid>
                <Grid item lg={10}>
                        <Item style={{height:'100%', padding:'20px'}}>
                            {callContent ?
                                content
                                :
                                ""
                            }
                                    <Grid container spacing={0} className="table-container">
                                        <Grid xs={1} item={true}>
                                            <div className="table-title table-top">유형</div>
                                        </Grid>
                                        <Grid xs={2} item={true}>
                                            <div className="table-content table-top">
                                                <FormControl className="table-select">
                                                    <Select
                                                        value={questionType}
                                                        onChange={changeType}
                                                        displayEmpty
                                                        inputProps={{ "aria-label": "Without label" }}
                                                    >
                                                        {Object.entries(QUESTIONTYPE).map(([type, text]) => (
                                                            <MenuItem key={type} value={type}>
                                                                {text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid xs={1} item={true}>
                                            <div className="table-title table-top">기출여부</div>
                                        </Grid>
                                        <Grid xs={1} item={true}>
                                            <div className="table-content table-top">
                                                <FormControl className="table-select">
                                                    <Checkbox
                                                        checked={pastYn}
                                                        onChange={() => setPastYn(!pastYn)}
                                                        sx={{
                                                            color: "#ff8b2c",
                                                            "& .MuiSvgIcon-root": { fontSize: 28 },
                                                            "&.Mui-checked": {
                                                                color: "#ff8b2c",
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid xs={1} item={true}>
                                            <div className="table-title table-top">발문</div>
                                        </Grid>
                                        <Grid xs={6} item={true}>
                                            <div className="table-content table-top">
                                                <FormControl className="table-input-select">
                                                    <TextField
                                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                                        label="발문"
                                                        value={questionTitle}
                                                    />
                                                </FormControl>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <TuiEditor content={subContent} editorRef={editorRef} />
                                    <Grid container>
                                        <Grid item lg={10.5} >
                                            <ChooseDataGrid
                                                chooseRef={chooseRef}
                                                questionType={questionType}
                                            />
                                        </Grid>
                                        <Grid item lg={1.5}>
                                            <DataGrid
                                                apiRef={answerRef}
                                                rows={DEFAULTANSWERROWS}
                                                columns={ANSWERCOLUMNS}
                                                slots={{ columnHeaders: () => null }}
                                                hideFooter={true}
                                                hideFooterPagination={true}
                                                hideFooterSelectedRowCount={true}
                                                checkboxSelection
                                                sx={{ marginBottom: 1 }}
                                            />
                                        </Grid>
                                    </Grid>
                        </Item>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    );
  }
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  }
}));
export default PassagePopup;
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '600px',
    lineHeight: '60px',
    width:'90%',
    margin:'0 auto'
}));