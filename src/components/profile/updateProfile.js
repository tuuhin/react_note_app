import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import { Navigate } from "react-router-dom";
import NavBar from "../navBar";
import { Box } from "@mui/system";
import { Container, Input, Typography, Stack, Avatar } from "@mui/material";

export default function UpdateProfile() {
  const [file, setFile] = useState("");
  const { user } = useUser();
  return user ? (
    <>
      <NavBar />
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Typography>Upload</Typography>
          <input
            accept="image/x-png,image/jpeg"
            type={"file"}
            value={file}
            onChange={(e) => console.log(e.target.value)}
          />
        </Box>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
