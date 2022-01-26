import {
  Typography,
  Alert,
  Button,
  Container,
  TextField,
  Stack,
  Collapse,
  Fade,
  Divider,
  InputLabel,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { signUp } from "../../services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
import SignInWithGoggleButton from "./signInWithGoggleButton";
import { validateEmail } from "../../utils/validators";
import image from "../../img/auth2.jfif";
export default function SignUp() {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const signNewUser = async (e) => {
    e.preventDefault();
    if (!name) return setNameError(true);
    if (!userName) return setUserNameError(true);
    if (!validateEmail(email)) return setEmailError(true);
    if (!password) return setPasswordError(true);
    try {
      setLoading(true);
      await signUp(email, password, name, userName);
    } catch (e) {
      setLoading(false);
      setCollapsed(true);
      setAlertHead("warning");
      setAlertBody(e.code.replace("auth/", ""));
    }
  };
  return !user ? (
    <Stack
      alignItems={"center"}
      direction={"row"}
      justifyContent={"space-between"}
    >
      <img style={{ height: "100vh" }} alt="" src={image} />
      <Fade in timeout={800}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "flex-start",
              height: "100vh",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontFamily: "Poppins", fontWeight: "600" }}
            >
              Get's started.
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "gray",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                }}
              >
                {"Already have a account?"}
              </Typography>
              <Button
                sx={{ textTransform: "none", mt: 1, mb: 1 }}
                variant="text"
                component={Link}
                to="/login"
              >
                {"Sign In"}
              </Button>
            </Stack>
            <SignInWithGoggleButton title={"Sign Up with Google"} isNew />
            <Divider sx={{ width: "100%" }}>
              <Typography
                variant="caption"
                sx={{ color: "gray", position: "relative", top: "5px" }}
              >
                {"OR"}
              </Typography>
            </Divider>
            <Grid
              container
              spacing={1}
              component="form"
              noValidate
              sx={{ width: "100%", mt: 1 }}
              onSubmit={signNewUser}
            >
              <Grid item sm={12} lg={12}>
                <Collapse in={collapsed} sx={{ width: "100%" }}>
                  <Alert severity={alertHead}>{alertBody}</Alert>
                </Collapse>
              </Grid>
              <Grid item sm={6} lg={6}>
                <InputLabel
                  htmlFor="name"
                  error={nameError}
                  sx={{ fontFamily: "Poppins", fontWeight: "500" }}
                >
                  {"Name"}
                </InputLabel>
                <TextField
                  value={name}
                  type="text"
                  error={nameError}
                  required
                  fullWidth
                  id="name"
                  name="name"
                  onFocus={() => {
                    setCollapsed(false);
                    setNameError(false);
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item sm={6} lg={6}>
                <InputLabel
                  htmlFor="username"
                  error={userNameError}
                  sx={{ fontFamily: "Poppins", fontWeight: "500" }}
                >
                  {"Username"}
                </InputLabel>
                <TextField
                  value={userName}
                  type="text"
                  error={userNameError}
                  required
                  fullWidth
                  id="username"
                  name="username"
                  onFocus={() => {
                    setCollapsed(false);
                    setUserNameError(false);
                  }}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item lg={12} sm={12}>
                <InputLabel
                  htmlFor="email"
                  error={emailError}
                  sx={{ fontFamily: "Poppins", fontWeight: "500" }}
                >
                  {"Email"}
                </InputLabel>
                <TextField
                  value={email}
                  type="email"
                  error={emailError}
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  onFocus={() => {
                    setCollapsed(false);
                    setEmailError(false);
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item lg={12} sm={12}>
                <InputLabel
                  htmlFor="password"
                  error={passwordError}
                  sx={{ fontFamily: "Poppins", fontWeight: "500" }}
                >
                  {"Password"}
                </InputLabel>
                <TextField
                  sx={{ padding: "2px" }}
                  value={password}
                  error={passwordError}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onFocus={() => {
                    setCollapsed(false);
                    setPasswordError(false);
                  }}
                />
              </Grid>
              <Grid item lg={12} sm={12}>
                <Button
                  fullWidth={loading ? true : false}
                  sx={{ textTransform: "none" }}
                  variant={"contained"}
                  type="submit"
                  size="large"
                >
                  {!loading ? (
                    "Create A Account"
                  ) : (
                    <CircularProgress color="inherit" />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Fade>
    </Stack>
  ) : (
    <Navigate to="/" />
  );
}
