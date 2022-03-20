import React from "react";
import { Typography, Container } from "@mui/material";
import { StyledLink } from "../../utils/styled";
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
      <Typography variant="h1">!404!</Typography>
      <Typography variant="caption">
        {"This page don'\t exists.This route is a invalid one."}
      </Typography>
      <div style={{ height: 20 }}></div>
      <StyledLink to="/">{"Click to return to home"}</StyledLink>
    </Container>
  );
}
