import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ListItemText from "@mui/material/ListItemText";
import {
  Collapse,
  IconButton,
  ListItem,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {Dispatch, SetStateAction} from "react";
import { QUESTIONTYPE } from "@common/const";
interface callParent {
  data: { question: [] }[],
  controlContent:Dispatch<SetStateAction<boolean>>,
  controlContentValue:boolean,
  controlType:Dispatch<SetStateAction<string>>,
  controlTypeValue:string,
  controlSubTitle:Dispatch<SetStateAction<string>>,
  editor:any,
  controlPastYn:Dispatch<SetStateAction<boolean>>,
}
export default function NestedList(props:callParent) {
  const [open, setOpen] = React.useState(true);
  const [listData, setListData] = React.useState(props.data);
  const handleClick = () => {
    setOpen(!open);
  };

  const setParent = (type:string, content:string, subTitle:string, pastYn:boolean) => {
    props.controlType(type)
    props.editor.current.getInstance().setHTML(content)
    props.controlSubTitle(subTitle)
    props.controlPastYn(pastYn)
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={
      <ListItemButton onClick={()=>props.controlContent(!props.controlContentValue)}>
        <ListSubheader sx={{width:'100%'}} component="div" id="nested-list-subheader">
          지문
        </ListSubheader>
      </ListItemButton>
      }
    >
      {listData.map(
        (
          value1: any,
          index,
          array
        ) =>
          value1.question.length > 1 ? (
            <div key={value1.question[index].questionType}>
              <ListItem
                sx={{ paddingRight: "40px" }}
                secondaryAction={
                  <IconButton aria-label="comment" style={{ padding: "0" }}>
                    <CancelPresentationIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={handleClick}
                  style={{ paddingRight: "0" }}
                >
                  <ListItemText primary="복합유형" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {value1.question.map((value2:any) => (
                    <ListItem
                        sx={{ paddingRight: "40px" }}
                      key={value2.questionId}
                        onClick={()=>setParent(value2.questionType,value1.questionContent, value2.questionSubTitle,value2.pastYn)}
                      secondaryAction={
                        <IconButton
                          aria-label="comment"
                          style={{ padding: "0" }}
                        >
                          <CancelPresentationIcon />
                        </IconButton>
                      }
                    >
                      <ListItemButton style={{ paddingRight: "0", paddingLeft:'30px' }}>
                        <ListItemText
                          primary={QUESTIONTYPE[value2.questionType]}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ) : (
            <ListItem
              key={value1.question[0].questionId}
              sx={{ paddingRight: "40px" }}
              onClick={()=>setParent(value1.question[0].questionType, value1.questionContent, value1.question[0].questionSubTitle,value1.question[0].pastYn)}
              secondaryAction={
                <IconButton aria-label="comment" style={{ padding: "0" }}>
                  <CancelPresentationIcon />
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemText
                  primary={QUESTIONTYPE[value1.question[0].questionType]}
                />
              </ListItemButton>
            </ListItem>
          )
      )}
    </List>
  );
}
