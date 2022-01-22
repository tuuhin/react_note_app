import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import DateFormat from "../../../utils/dateFormat";
export default function NoteNavBar(props) {
  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;
  return (
    <AppBar
      position="static"
      color={"inherit"}
      elevation={0}
      sx={{ borderBottom: "1px solid grey", flexGrow: 1 }}
    >
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <Stack direction="column" sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, fontFamily: "Poppins", fontWeight: 500 }}
          >
            {props.heading}
          </Typography>
          <Typography
            variant="overline"
            sx={{ flexGrow: 1, fontFamily: "Poppins" }}
          >
            <DateFormat at={props.createdAt} />
          </Typography>
        </Stack>
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
          <MenuItem color="primary">{"Update"}</MenuItem>
          <MenuItem>
            <Button color="error">{"Delete"}</Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
