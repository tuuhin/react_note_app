import { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Avatar,
  Chip,
  Popover,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { MdAdd } from "react-icons/md";
import { useUser } from "../../../context/useUser";
import { currentDateFromTimeStamp } from "../../../utils/dateFormat";
import { useCurrentNote } from "../../../context/useCurrentNote";

export default function NoteMetaData(props) {
  const { user, userInfo } = useUser();
  const [anchor, setAnchor] = useState(null);
  const { tags, setTags } = useCurrentNote();
  const [newItem, setNewItem] = useState("");
  const open = !!anchor;

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags, setTags]);

  const addNewTag = () => {
    if (!newItem) return;
    setTags([...tags, newItem]);
    setNewItem("");
    setAnchor(null);
  };
  const removeTag = (e) => {
    setTags(tags.filter((value) => value !== e));
  };
  return (
    <>
      <Grid container sx={{ p: 1.5 }} rowSpacing={1} columnSpacing={2}>
        <Grid item lg={2} sm={3}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
          >
            {"Created by"}
          </Typography>
        </Grid>
        <Grid item lg={10} sm={9}>
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
        </Grid>
        <Grid item lg={2} sm={3}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
          >
            {"Last Modified At"}
          </Typography>
        </Grid>
        <Grid item lg={10} sm={9}>
          <Typography variant="body2">
            {props.createdAt &&
              currentDateFromTimeStamp(props.updatedAt || props.createdAt)}
          </Typography>
        </Grid>
        <Grid item lg={2} sm={3}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
          >
            {"Tags"}
          </Typography>
        </Grid>
        <Grid item lg={10} sm={9}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap", gap: 1, width: "100%" }}
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
        </Grid>
      </Grid>
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
