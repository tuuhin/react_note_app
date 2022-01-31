import React from "react";
import { Typography, Grid, Stack, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useUser } from "../../../context/userContext";
import DateFormat from "../../../utils/dateFormat";
import { MutedText, Tag } from "../../../utils/styled";
export default function NoteMetaData(props) {
  const { user, userInfo } = useUser();
  return (
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
          {props.tags &&
            props.tags.map((e, i) => (
              <Grid key={i} item>
                <Tag>{e}</Tag>
              </Grid>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
}
