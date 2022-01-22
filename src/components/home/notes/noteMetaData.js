import React from "react";
import { Typography, Grid, Stack, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { Tag, MutedText } from "./extraStyles";
import { useUser } from "../../../context/userContext";
import DateFormat from "../../../utils/dateFormat";

export default function NoteMetaData(props) {
  const { user } = useUser();
  return (
    <Box sx={{ p: 2 }}>
      <Stack direction={"row"} spacing={10} alignItems={"center"}>
        <MutedText>Created by</MutedText>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Avatar sx={{ width: "24px", height: "24px" }} src={user.photoURL} />
          <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
            {props.username || user.email}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} spacing={10} alignItems={"center"}>
        <MutedText>Last Modified At</MutedText>
        <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
          <DateFormat at={props.updatedAt || props.createdAt} />
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={10} alignItems={"center"}>
        <MutedText>Tags</MutedText>
        <Grid container direction={"row"} spacing={2} alignItems={"center"}>
          {props.tags &&
            props.tags.map((e, i) => (
              <Grid key={i} item>
                <Tag>{e}</Tag>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Box>
  );
}
