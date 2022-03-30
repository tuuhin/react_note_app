import {
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { logOut } from "../../data/services/authservice";
import { LogoLink } from "./styled";
import { useState } from "react";

export default function NavBar() {
  const { user, userInfo } = useUser();
  const [anchor, setAnchor] = useState(null);

  const LogOut = async () => {
    try {
      await logOut();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <AppBar position="static" color={"inherit"}>
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: 1 }}>
          <LogoLink variant="text" component={Link} to="/">
            {"afternotes"}
          </LogoLink>
        </div>
        <Menu
          open={!!anchor}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MenuItem component={Link} to="/profile">
            <ListItemText>{"Profile"}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={LogOut}
            component={Link}
            to="/login"
            color={"error"}
          >
            <ListItemText>{"Logout"}</ListItemText>
          </MenuItem>
        </Menu>
        <Avatar
          onClick={(e) => setAnchor(e.currentTarget)}
          src={(userInfo && userInfo.photoURL) || user.photoURL}
          sx={{
            ml: 1,
            border: "2px dashed gray",
            "&:hover": { cursor: "pointer" },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
