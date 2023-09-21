import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  ListSubheader,
} from "@mui/material";
import React, { useState } from "react";

//css
import "@css/questionCreate/questionList.scss";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomButton from "@components/ui/button/custeomButton";
import { useNavigate } from "react-router-dom";
import { PATH } from "@common/domain";

const QuestionList = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };

  const { width, height } = props;

  // const [clickedButton, setClickedButton] = useState<HTMLButtonElement | null>(
  //   null
  // );
  // const handleMouseEvent = (event: any) => {
  //   console.log(event.target);
  //   console.log(event.currentTarget);
  // };

  return (
    <div className="questionList-item">
      <List
        sx={{
          // maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          // maxHeight: 300,
          width: width ?? "auto",
          height: height ?? "auto",
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

        <CustomButton domain={PATH.QUESTION6} label={"GO!"} type={"true"}>
          {props.Children}
        </CustomButton>
      </List>
    </div>
  );
};

export default QuestionList;
