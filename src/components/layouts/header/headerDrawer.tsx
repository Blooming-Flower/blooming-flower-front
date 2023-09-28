import * as React from "react";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SummarizeIcon from "@mui/icons-material/Summarize";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { PATH } from "@common/domain";

const HeaderDrawer = ({ toggleDrawer }: any) => {
  const QUESTION = [
    PATH.QUESTION0,
    PATH.QUESTION1,
    PATH.QUESTION2,
    PATH.QUESTION3,
    // PATH.QUESTION4,
    PATH.QUESTION5,
  ];
  return (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List
        component="div"
        disablePadding
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Menu
          </ListSubheader>
        }
      >
        {[
          "지문관리",
          "지문저장",
          "문제출제",
          "시험지제작",
          // "시험지보기",
          "시험지관리",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to={QUESTION[index]}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <RecordVoiceOverIcon />
                ) : index === 1 ? (
                  <PeopleAltIcon />
                ) : index === 2 ? (
                  <SummarizeIcon />
                ) : index === 3 ? (
                  <EmojiEventsIcon />
                ) : index === 4 ? (
                  <EditRoadIcon />
                ) : (
                  <EditRoadIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
      </List>
    </Box>
  );
};
export default HeaderDrawer;
