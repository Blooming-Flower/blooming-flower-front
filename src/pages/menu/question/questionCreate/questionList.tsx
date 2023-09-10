import { Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const questionList = () => {
  return (
    <div>
      <Box>
        <List>
          <ListItem>
            <ListItemText primary="수능특강" />
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default questionList;
