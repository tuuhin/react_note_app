import {
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { logOut } from "../../data/services/authservice";
import { LogoLink } from "./styled";

export default function NavBar() {
  const { user, userInfo } = useUser();
  const [anchor, setAnchor] = useState(null);

  const LogOut = useCallback(async () => {
    try {
      await logOut();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const closeAnchor = () => setAnchor(null);
  const open = !!anchor;

  return (
    <AppBar position="static" color={"inherit"}>
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: 1 }}>
          <LogoLink variant="text" component={Link} to="/">
            {"afternotes"}
          </LogoLink>
        </div>
        <Menu
          open={open}
          anchorEl={anchor}
          onClose={closeAnchor}
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        >
          <MenuItem component={Link} to="/profile">
            <ListItemText primary={"Profile"} />
          </MenuItem>
          <MenuItem onClick={LogOut} component={Link} to="/login">
            <ListItemText primary={"Logout"} />
          </MenuItem>
        </Menu>
        <Avatar
          onClick={(e) => setAnchor(e.currentTarget)}
          src={(userInfo && userInfo.photoURL) || user.photoURL}
          sx={{
            ml: 1,
            border: "2px dashed gray",
            transition: "250ms ease-in-out",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.2)",
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
