import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ListItemText from "@mui/material/ListItemText";
import {Collapse, Divider, IconButton, ListItem, ListItemIcon} from "@mui/material";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {useEffect} from "react";

export default function NestedList(props:{data:{question:[]}[]}) {
  const [open, setOpen] = React.useState(true);
  const [listData, setListData] = React.useState(props.data)
  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                지문
              </ListSubheader>
            }>
          {listData.map((value:{question:{questionId:number,questionType:string}[]}, index, array)=>(
              value.question.length > 1 ? (
                  <div key={value.question[index].questionType}>
                  <ListItem
                      // key={value.question[index].questionType}
                      sx={{paddingRight:'40px'}}
                      secondaryAction={
                          <IconButton aria-label="comment" style={{padding:'0'}}>
                              <CancelPresentationIcon />
                          </IconButton>
                      }
                  >
                      <ListItemButton onClick={handleClick} style={{paddingRight:'0'}}>
                          <ListItemText primary='복합유형' />
                          {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit >
                      <List component="div" disablePadding>
                          {value.question.map((value)=>(
                              <ListItemButton sx={{ pl: 4 }} key={value.questionId}>
                                  <ListItemText primary={value.questionType} />
                              </ListItemButton>
                          ))}
                      </List>
                  </Collapse>
                  </div>
                  )
                  :
                  (
                  <ListItem
                      key={value.question[index].questionId}
                      sx={{paddingRight:'40px'}}
                      secondaryAction={
                          <IconButton aria-label="comment" style={{padding:'0'}}>
                              <CancelPresentationIcon />
                          </IconButton>
                      }
                  >
                      <ListItemButton>
                          <ListItemText primary={value.question[index].questionType} />
                      </ListItemButton>
                  </ListItem>
                  )
          ))}
      </List>
  );
}
