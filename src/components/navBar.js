import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { logOut } from "../services/authservice";

export default function NavBar() {
  const { user } = useUser();

  const LogOut = async () => {
    try {
      await logOut();
    } catch (e) {
      console.warn(e);
    }
  };
  const HelperButtons = () => {
    return user ? (
      <>
        <Button component={Link} to="/notes">
          Notes
        </Button>
        <Button onClick={LogOut}>Logout</Button>
      </>
    ) : (
      <>
        <Button to="/login" component={Link}>
          Login
        </Button>
        <Button to="/signup" component={Link}>
          SignUp
        </Button>
      </>
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color={"inherit"}
        elevation={0}
        sx={{ borderBottom: "1px solid grey" }}
      >
        <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Note
          </Typography>
          <HelperButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
