import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { MdMoreVert } from "react-icons/md";
import Editor from "../editor/editor";
import CurrentContent from "./currentContent";
import { useState } from "react";
export default function NoteDetails() {
  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        width: "60vw",
      }}
    >
      <AppBar
        position="static"
        color={"inherit"}
        elevation={0}
        sx={{ borderBottom: "1px solid grey", flexGrow: 1 }}
      >
        <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Note
          </Typography>
          <>
            <IconButton
              id="tabar-button"
              onClick={(e) => setAnchor(e.currentTarget)}
            >
              <MdMoreVert />
            </IconButton>
            <Menu
              open={open}
              anchorEl={anchor}
              onClose={() => setAnchor(null)}
              MenuListProps={{ "aria-labelledby": "tabar-button" }}
            >
              <MenuItem>Update</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </>
        </Toolbar>
      </AppBar>
      <Box sx={{ pl: 2, pr: 2, height: "80vh", overflow: "scroll" }}>
        <CurrentContent />
        <Editor />
      </Box>
    </Box>
  );
}
