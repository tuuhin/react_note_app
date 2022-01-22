import {
  Typography,
  Alert,
  Button,
  Container,
  TextField,
  Stack,
  Collapse,
  Fade,
  CircularProgress,
  Slide,
  InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { signIn } from "../../services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
import image from "../../img/auth1.jfif";
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
      setAlertBody(e.code || e);
    }
  };
  return !user ? (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Slide in timeout={1000} direction={"right"}>
        <img style={{ height: "100vh" }} alt="" src={image} />
      </Slide>
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
              Welcome Back!
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
                Don't have account
              </Typography>
              <Button
                sx={{ textTransform: "none" }}
                variant="text"
                component={Link}
                to="/signup"
              >
                Sign up
              </Button>
            </Stack>
            <Stack
              component="form"
              noValidate
              onSubmit={signUserIn}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <Collapse in={collapsed} sx={{ width: "100%" }}>
                <Alert severity={alertHead}>{alertBody}</Alert>
              </Collapse>
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
              <Button
                fullWidth
                variant={"contained"}
                type="submit"
                size="large"
              >
                {!loading ? "Sign In" : <CircularProgress color="inherit" />}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Fade>
    </Stack>
  ) : (
    <Navigate to="/" />
  );
}
