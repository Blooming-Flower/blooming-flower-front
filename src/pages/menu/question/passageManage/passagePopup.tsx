import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  ListItemButton, ListItemIcon,
  ListItemText, ListSubheader,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import Typography from "@mui/material/Typography";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import List from "@mui/material/List";

const PassagePopup = forwardRef((props: {}, ref: ForwardedRef<any>) => {
  const [open, setOpen] = React.useState(false);
  const [openList, setOpenList] = React.useState(true);
  const handleClick = () => {
    setOpenList(!openList);
  };
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
        <Box style={{ float: "left", width:'250px' }}>
          <List
            sx={{ width: "100%",  bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                지문
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemText primary="Sent mail" />
              <ListItemIcon>
                <HighlightOffIcon/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Drafts" />
              <ListItemIcon>
                <HighlightOffIcon/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Inbox" />
              {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Starred" />
                  <ListItemIcon>
                    <HighlightOffIcon/>
                  </ListItemIcon>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
        <Box style={{ float: "right" }}>지문+에디터</Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default PassagePopup;
