import DialogTitle from "@mui/material/DialogTitle";
import {Button, Grid, IconButton, Paper, styled} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { alert } from '@utils/alert'
import { ALERT } from '@common/const'
import {
    ForwardedRef,
    forwardRef,
    useEffect,
    useImperativeHandle, useRef,
} from "react";
import Typography from "@mui/material/Typography";
import VerticalTabs from "@pages/menu/question/passageManage/passageTabs";
import { $GET } from "@utils/request";
import TuiEditor from "@components/ui/tui/toast";


const PassagePopup = forwardRef(
  (props: { passageId: number | undefined }, ref: ForwardedRef<any>) => {
      const editorRef = useRef<any>(null);
      const [check, setCheck] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [listData, setListData] = React.useState([])
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
                <Grid item lg={3}>
                    <VerticalTabs data={listData}/>
                </Grid>
                <Grid item lg={9}>
                        <Item>
                            {content}
                            <TuiEditor content={content} editorRef={editorRef}/>
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