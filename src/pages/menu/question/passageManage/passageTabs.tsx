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
import {Dispatch, MutableRefObject, SetStateAction} from "react";
import { QUESTIONTYPE } from "@common/const";
import {GridApiCommunity} from "@mui/x-data-grid/internals";
interface callParent {
  data: { question: [] }[],
  parent : popupProps
  setParent :setPopupProps
  editor:any,
  answerRef:any,
  chooseRef:any
}
export default function NestedList(props:callParent) {
  const [open, setOpen] = React.useState(false);
  const [listData, setListData] = React.useState(props.data);
  const handleClick = (content:string,title:string) => {
    props.setParent((parent:any)=>({
      ...parent,
      display:1,
      type:"Q25",
      title:title,
      subContent:content
    }))
    props.editor.current.getInstance().setHTML(content)
    setOpen(!open);
  };

  const setParent = (type:string, content:string, subTitle:string, title:string, pastYn:boolean, display:number) => {
    props.setParent((parent:any)=>({
      ...parent,
      type:display == 2 ? "Q25" : type,
      subType:display == 2 ? type : "",
      subTitle:subTitle,
      title:title,
      pastYn:display == 2 ? false : pastYn,
      subPastYn: display == 2 ? pastYn : false,
      display:display,
      subContent:content
    }))
    props.editor.current.getInstance().setHTML(content)
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={
      <ListItemButton onClick={()=>props.setParent((parent:any)=>({
        ...parent,
        callPassage:!props.parent.callPassage
      }))}>
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
                  onClick={()=>handleClick(value1.questionContent,value1.questionTitle)}
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
                        onClick={()=>setParent(value2.questionType,value1.questionContent, value1.questionTitle, value2.questionSubTitle,value2.pastYn,2)}
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
              onClick={()=>setParent(value1.question[0].questionType, value1.questionContent, "", value1.question[0].questionSubTitle, value1.question[0].pastYn,3)}
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
