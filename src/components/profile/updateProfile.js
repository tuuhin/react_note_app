import {
  Container,
  Avatar,
  Stack,
  Paper,
  TextField,
  InputLabel,
  Alert,
  Badge,
  Grid,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import { MdCamera } from "react-icons/md";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../common/navBar";
import { useFilePicker } from "use-file-picker";
import { useUser } from "../../context/useUser";
import { BlackButton } from "../common/styled";
import { dateFormatWithTime } from "../../utils/dateFormat";
import { updateUser } from "../../data/services/firestore";

export default function UpdateProfile() {
  const { user, userInfo } = useUser();
  const [isCollpased, setIsColapsed] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const [about, setAbout] = useState(userInfo != null ? userInfo.about : "");
  const [name, setName] = useState(userInfo != null ? userInfo.name : "");

  const [userName, setUserName] = useState(
    userInfo != null ? userInfo.userName : ""
  );
  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 2,
  });

  const update = async (e) => {
    e.preventDefault();

    if (!name) return setNameError(true);
    if (!userName) return setUserNameError(true);

    try {
      setIsColapsed(false);
      setAlertType("warning");
      setLoading(true);
      await updateUser(user, name, userName, about, filesContent[0]);
      setLoading(false);
      setIsColapsed(true);
      setAlertType("success");
      setAlert("Your profile has been updated 😘");
    } catch (e) {
      setIsColapsed(true);
      setAlertType("error");
      setLoading(false);
      console.warn(e);
      setAlert("Failed to update your profile 😔");
    }
  };

  return user ? (
    <>
      <NavBar />
      <Container
        maxWidth="sm"
        component="form"
        noValidate
        onSubmit={update}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          spacing={1}
          justifyContent={"flex-start"}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar>
                <IconButton
                  onClick={openFileSelector}
                  sx={{ p: 0, border: "12px solid white", m: 0 }}
                >
                  <MdCamera />
                </IconButton>
              </Avatar>
            }
          >
            <Avatar
              sx={{ top: 4, width: "128px", height: "128px" }}
              src={
                (filesContent[0] && filesContent[0].content) ||
                (userInfo && userInfo.photoURL) ||
                user.photoURL
              }
            />
          </Badge>
          <Typography sx={{ fontSize: "1.2em", mt: 0 }} variant={"body2"}>
            {"Select your image"}
          </Typography>
        </Stack>
        <div style={{ height: 10 }} />
        <Paper elevation={4} sx={{ width: "100%", p: 2 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} lg={6} xs={12}>
              <InputLabel
                htmlFor="name"
                required
                error={nameError}
                sx={{ fontFamily: "Poppins" }}
              >
                {"Name"}
              </InputLabel>
              <TextField
                fullWidth
                type="text"
                id="name"
                error={nameError}
                name="name"
                value={name}
                onFocus={() => setNameError(false)}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item sm={6} lg={6} xs={12}>
              <InputLabel
                htmlFor="username"
                required
                error={userNameError}
                sx={{ fontFamily: "Poppins" }}
              >
                {"Username"}
              </InputLabel>
              <TextField
                fullWidth
                error={userNameError}
                type="text"
                id="name"
                name="name"
                value={userName}
                onFocus={() => setUserNameError(false)}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item sm={12} lg={12} xs={12}>
              <InputLabel htmlFor="username" sx={{ fontFamily: "Poppins" }}>
                {"About"}
              </InputLabel>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Grid>
            <Grid item sm={12} lg={12} xs={12}>
              <BlackButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </BlackButton>
            </Grid>
          </Grid>
          {userInfo && (
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                color: "rgba(80,80,80,0.8)",
                fontStyle: "italic",
                display: "block",
              }}
            >
              {`updated ${dateFormatWithTime(userInfo.updatedAt)}...`}
            </Typography>
          )}
        </Paper>
        <Snackbar open={isCollpased}>
          <Alert severity={alertType}>{alert}</Alert>
        </Snackbar>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
