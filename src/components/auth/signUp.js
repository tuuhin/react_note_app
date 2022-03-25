import {
  Alert,
  Container,
  TextField,
  Stack,
  Collapse,
  Fade,
  Divider,
  Slide,
  InputLabel,
  Grid,
} from "@mui/material";
import { BlackButton } from "../common/styled";
import { Box } from "@mui/system";
import { useState } from "react";
import { signUp } from "../../data/services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { SignUpMetaData } from "./headers";
import SocialAuth from "./socialAuth";
import { validateEmail } from "../../utils/validators";
import image from "../img/auth2.jfif";

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
      <Fade in timeout={800}>
        <img style={{ height: "100vh" }} alt="" src={image} />
      </Fade>

      <Slide in timeout={1200} direction="left">
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
            <SignUpMetaData />
            <SocialAuth />
            <Divider sx={{ width: "100%" }} />
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
                <BlackButton
                  fullWidth
                  variant={"contained"}
                  type="submit"
                  disabled={loading}
                  size="large"
                >
                  {!loading ? "Register " : "Authenticating..."}
                </BlackButton>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Slide>
    </Stack>
  ) : (
    <Navigate to="/" />
  );
}
