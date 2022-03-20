import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  Popover,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import { MdMoreVert, MdDeleteForever, MdUpdate } from "react-icons/md";
import DateFormat from "../../../utils/dateFormat";
export default function NoteNavBar(props) {
  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;
  return (
    <Box sx={{ height: "64px" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "2px solid whitesmoke",
          flexGrow: 1,
        }}
      >
        <Stack direction="column" sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {props.heading}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "Poppins", color: "gray" }}
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
        <Popover
          open={open}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{ vertical: "center", horizontal: "left" }}
        >
          <Stack direction={"column"} sx={{ p: 1 }}>
            <Button
              color={"success"}
              sx={{ fontWeight: 600 }}
              variant={"text"}
              startIcon={<MdUpdate />}
            >
              {"Update"}
            </Button>
            <Divider />
            <Button
              color={"error"}
              variant="text"
              fullWidth
              startIcon={<MdDeleteForever />}
              sx={{ fontWeight: 600 }}
            >
              {"Delete"}
            </Button>
          </Stack>
        </Popover>
      </Toolbar>
    </Box>
  );
}
