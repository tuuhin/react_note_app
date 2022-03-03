import {
  Typography,
  Alert,
  Button,
  Container,
  TextField,
  Stack,
  Collapse,
  Fade,
  Grid,
  CircularProgress,
  InputLabel,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { signIn } from "../../services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { Link } from "react-router-dom";
import image from "../../img/auth1.jfif";
import SocialAuth from "./socialAuth";

export default function SignUp() {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const signUserIn = async (e) => {
    e.preventDefault();
    if (!email) return setEmailError(true);
    if (!password) return setPasswordError(true);
    try {
      setLoading(true);
      await signIn(email, password);
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
      direction={{ sm: "row", xs: "column" }}
      justifyContent={"space-around"}
    >
      <img alt="" src={image} style={{ height: "100vh" }} />
      <Fade in timeout={1000}>
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontFamily: "Poppins", fontWeight: "600" }}
            >
              {" Welcome Back!"}
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
                {"Don't have account"}
              </Typography>
              <Button
                sx={{
                  textTransform: "none",
                  color: "darkslategray",
                  fontWeight: 500,
                }}
                variant="text"
                component={Link}
                to="/signup"
              >
                {"Sign up"}
              </Button>
            </Stack>
            <SocialAuth />
            <Divider sx={{ width: "100%" }} />
            <Collapse in={collapsed} sx={{ width: "100%", mt: 1 }}>
              <Alert sx={{ borderRadius: 5 }} severity={alertHead}>
                {alertBody.toUpperCase()}
              </Alert>
            </Collapse>

            <Grid
              container
              component="form"
              noValidate
              onSubmit={signUserIn}
              spacing={2}
              sx={{ width: "100%", mt: 1 }}
            >
              <Grid item sm={12} lg={12}>
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
              <Grid item sm={12} lg={12}>
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
                  fullWidth
                  variant={"contained"}
                  type="submit"
                  size="large"
                  sx={{ textTransform: "none" }}
                >
                  {!loading ? "Sign In" : <CircularProgress color="inherit" />}
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
