import React from "react";
import { Typography, Container } from "@mui/material";
import { StyledLink } from "./styled";
export default function InvalidPage() {
  return (
    <Container
      maxWidth="xs"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontFamily: "Poppins" }}>
        !404!
      </Typography>
      <Typography variant="caption" sx={{ fontFamily: "Poppins" }}>
        {"This page don'\t exists."}
      </Typography>
      <div style={{ height: 20 }} />
      <StyledLink to="/">{"Click to return to home"}</StyledLink>
    </Container>
  );
}
