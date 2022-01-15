import React from "react";
import { Typography, Grid, Stack, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { Tag, MutedText } from "./extraStyles";
export default function CurrentContent() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
        Database Management
      </Typography>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          width: "90%",
          justifyContent: "space-around",
        }}
      >
        <Stack direction={"row"} spacing={10} alignItems={"center"}>
          <MutedText>Created by</MutedText>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar sx={{ width: "24px", height: "24px" }}>H</Avatar>
            <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
              hey babu
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={10} alignItems={"center"}>
          <MutedText>Last Modified At</MutedText>
          <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
            {"Fri 21, 4040"}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={10} alignItems={"center"}>
          <MutedText>Tags</MutedText>
          <Grid container direction={"row"} spacing={2} alignItems={"center"}>
            {Array.from(Array(10), (_, i) => i + 1).map((e, i) => (
              <Grid key={e} item>
                <Tag>{`Javascript ${e}`}</Tag>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
