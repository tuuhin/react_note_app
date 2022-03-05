import { useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../utils/navBar";
import { Box } from "@mui/system";
import {
  Container,
  Divider,
  Avatar,
  Stack,
  Paper,
  Button,
  TextField,
  InputLabel,
  Collapse,
  Alert,
  ListItemText,
  ListItem,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MdMoreVert } from "react-icons/md";
import { useFilePicker } from "use-file-picker";
import { useUser } from "../../context/useUser";
import { updateUser } from "../../services/firestore";

export default function UpdateProfile() {
  const { user, userInfo } = useUser();
  const [isCollpased, setIsColapsed] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const [about, setAbout] = useState(userInfo.about);
  const [name, setName] = useState(userInfo.name);

  const [userName, setUserName] = useState(userInfo.userName);
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
      setAlert("Updated");
      setName("");
      setUserName("");
      setAbout("");
    } catch (e) {
      setIsColapsed(true);
      setAlertType("error");
      console.log(e);
      setAlert("failed");
    }
  };

  return user ? (
    <>
      <NavBar />
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Paper
            sx={{ width: "100%", p: 2 }}
            component="form"
            noValidate
            onSubmit={update}
          >
            <Stack direction={"row"}>
              <ListItem>
                <ListItemText
                  primary="Profile"
                  secondary={"Update Your photo and personal details here"}
                />
              </ListItem>
              <IconButton>
                <MdMoreVert />
              </IconButton>
            </Stack>
            <Divider />
            <Grid item sm={12} lg={12}>
              <Collapse in={isCollpased}>
                <Alert severity={alertType}>{alert}</Alert>
              </Collapse>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item sm={12} lg={12}>
                <Stack direction={"row"} alignItems={"center"} spacing={5}>
                  <Avatar
                    sx={{ top: 4, width: 64, height: 64 }}
                    onClick={openFileSelector}
                    src={
                      (filesContent[0] && filesContent[0].content) ||
                      (userInfo && userInfo.photoURL) ||
                      user.photoURL
                    }
                  />
                  <ListItem>
                    <ListItemText
                      primary="Select a photo"
                      secondary={"Add a profile picture"}
                    />
                  </ListItem>
                </Stack>
              </Grid>
              <Grid item sm={6} lg={6}>
                <InputLabel htmlFor="name" required error={nameError}>
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
              <Grid item sm={6} lg={6}>
                <InputLabel htmlFor="username" required error={userNameError}>
                  {"UserName"}
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
              <Grid item sm={12} lg={12}>
                <InputLabel htmlFor="username">{"About"}</InputLabel>
                <TextField
                  fullWidth
                  multiline
                  maxRows={2}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Grid>
              <Grid item sm={12} lg={12}>
                <Button type="submit" variant="contained" fullWidth>
                  {loading ? <CircularProgress /> : "Update"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
