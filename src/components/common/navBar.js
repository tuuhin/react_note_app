import { AppBar, Toolbar, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { logOut } from "../../services/authservice";
import { NavButtons, LogoLink } from "../../utils/styled";

export default function NavBar() {
  const { user, userInfo } = useUser();

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
        <NavButtons component={Link} to="/profile">
          {"Profile"}
        </NavButtons>
        <NavButtons onClick={LogOut} component={Link} to="/login">
          Logout
        </NavButtons>
        <Avatar
          onClick={() => console.log("hi")}
          src={(userInfo && userInfo.photoURL) || user.photoURL}
          sx={{ ml: 1, border: "2px dashed gray" }}
        />
      </>
    ) : (
      <></>
    );
  };
  return (
    <AppBar position="static" color={"inherit"}>
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: 1 }}>
          <LogoLink variant="text" component={Link} to="/">
            {"afternotes"}
          </LogoLink>
        </div>
        <HelperButtons />
      </Toolbar>
    </AppBar>
  );
}
