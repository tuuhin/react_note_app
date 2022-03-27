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
import DateFormat from "../../../utils/dateFormat";

export default function NoteMetaData(props) {
  const { user, userInfo } = useUser();
  const [anchor, setAnchor] = useState(null);
  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState("");
  const open = !!anchor;

  useEffect(() => {
    console.log("useEffect ran!!");
    setTags(props.tags);
  }, [props.tags]);

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
      <Grid container sx={{ p: 1.5 }} spacing={1}>
        <Grid item lg={2} sm={2} xs={4}>
          <Typography variant="subtitle2">{"Created by"}</Typography>
        </Grid>
        <Grid item lg={4} sm={4} xs={8}>
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
        <Grid item lg={2} sm={2} xs={4}>
          <Typography variant="subtitle2">{"Last Modified At"}</Typography>
        </Grid>
        <Grid item lg={4} sm={4} xs={8}>
          <Typography variant="body2">
            <DateFormat at={props.updatedAt || props.createdAt} />
          </Typography>
        </Grid>
        <Grid item lg={2} sm={2} xs={12}>
          <Typography variant="subtitle2">{"Tags"}</Typography>
        </Grid>
        <Grid item lg={8} sm={8} xs={12}>
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
