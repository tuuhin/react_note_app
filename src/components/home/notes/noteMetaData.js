import { useState } from "react";
import {
  Typography,
  Stack,
  Avatar,
  Chip,
  Popover,
  TextField,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { MdAdd } from "react-icons/md";
import { useUser } from "../../../context/useUser";
import DateFormat from "../../../utils/dateFormat";
import { MutedText, BlackButton } from "../../../utils/styled";

export default function NoteMetaData(props) {
  const { user, userInfo } = useUser();
  const [anchor, setAnchor] = useState(null);
  const [tags, setTags] = useState(props.tags);
  const [newItem, setNewItem] = useState("");
  const open = !!anchor;

  const addNewTag = () => {
    if (!newItem) return;
    setTags([...tags, newItem]);
    setNewItem("");
  };
  const removeTag = (e) => {
    setTags(tags.filter((value) => value !== e));
  };
  return (
    <>
      <Box sx={{ pl: 3 }}>
        <Stack direction={"row"} spacing={10} alignItems={"center"}>
          <MutedText>{"Created by"}</MutedText>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Avatar
              sx={{ width: "30px", height: "30px", borderRadius: "5px" }}
              src={(userInfo && userInfo.photoURL) || user.photoURL}
            />
            <Typography
              variant="body1"
              sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
            >
              {userInfo.userName || user.email}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={6} alignItems={"center"}>
          <MutedText>{"Last Modified At"}</MutedText>
          <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
            <DateFormat at={props.updatedAt || props.createdAt} />
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={10} alignItems={"center"}>
          <MutedText>Tags</MutedText>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            {tags &&
              tags.map((e, i) => (
                <Chip label={e} onDelete={() => removeTag(e)} key={i} />
              ))}

            <Chip
              label={"Add"}
              avatar={<MdAdd />}
              onClick={(e) => setAnchor(e.currentTarget)}
            />
          </Stack>
        </Stack>
      </Box>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Stack direction="column" sx={{ pl: 1, pr: 1 }}>
          <TextField
            variant="standard"
            autoFocus
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <Button onClick={addNewTag}>{"Add"}</Button>
        </Stack>
      </Popover>
    </>
  );
}
