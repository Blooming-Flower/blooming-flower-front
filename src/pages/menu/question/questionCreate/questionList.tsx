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
import DeleteIcon from "@mui/icons-material/Delete";

//css
import "@css/questionCreate/questionList.scss";
import { ExpandMore, ExpandLess, StarBorder } from "@mui/icons-material";

const QuestionList = () => {
  const [open, setOpen] = React.useState(true);
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
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`수능특강 ${sectionId}`}</ListSubheader>
              {[0, 1, 2].map((item) => (
                <ListItem
                  key={`item-${sectionId}-${item}`}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary={`YBM ${item}`} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </div>
  );
};

export default QuestionList;
