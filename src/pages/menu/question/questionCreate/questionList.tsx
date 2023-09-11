import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListSubheader,
} from "@mui/material";
import React, { useState } from "react";

//css
import "@css/questionCreate/questionList.scss";
import { ExpandMore, ExpandLess, StarBorder } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomButton from "@components/ui/button/custeomButton";

const QuestionList = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="questionList-item">
      <List
        sx={{
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {[0, 1].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`수능특강 ${sectionId}`}</ListSubheader>
              {[0, 1, 2].map((item) => (
                <ListItem
                  key={`item-${sectionId}-${item}`}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <HighlightOffIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={`YBM ${item}`} />
                </ListItem>
              ))}

              <ListItemButton onClick={handleClick}>
                <ListItemText primary="YBM 3" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </ul>
          </li>
        ))}
        <CustomButton label={"GO!"} type={"true"} />
      </List>
    </div>
  );
};

export default QuestionList;
