import DialogTitle from "@mui/material/DialogTitle";
import {Button, Grid, IconButton, Paper, styled} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import Typography from "@mui/material/Typography";
import VerticalTabs from "@pages/menu/question/passageManage/passageTabs";
import { $GET } from "@utils/request";

const PassagePopup = forwardRef(
  (props: { passageId: number | undefined }, ref: ForwardedRef<any>) => {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState("");
    useEffect(() => {
      if (props.passageId != undefined) {
        $GET("/api/v1/passage/search/" + props.passageId, (res: any) => {
            console.log(res.data.passageContent)
            setContent(res.data.passageContent)
        });
      }
    }, [open]);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
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
        <DialogTitle sx={{ m: 1, p: 2 }} id="customized-dialog-title">
          <Typography
            component="div"
            variant="h3"
            sx={{ fontWeight: "bold", color: "#ff8b2c", paddingBottom: "20px" }}
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
            <Grid container>
                <Grid item lg={3}>
                    <VerticalTabs />
                </Grid>
                <Grid item lg={9}>
                    <Item>
                        {content}
                    </Item>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
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