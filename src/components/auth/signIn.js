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
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
import image from "../../img/auth1.jfif";
import SignInWithGoggleButton from "./signInWithGoggleButton";
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
      direction={"row"}
      justifyContent={"space-between"}
    >
      <img style={{ height: "100vh" }} alt="" src={image} />
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
                sx={{ textTransform: "none" }}
                variant="text"
                component={Link}
                to="/signup"
              >
                {"Sign up"}
              </Button>
            </Stack>
            <SignInWithGoggleButton title={"Sign In with Google"} />
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
              component="form"
              noValidate
              onSubmit={signUserIn}
              spacing={2}
              sx={{ width: "100%", mt: 2 }}
            >
              <Grid item sm={12} lg={12}>
                <Collapse in={collapsed} sx={{ width: "100%" }}>
                  <Alert severity={alertHead}>{alertBody}</Alert>
                </Collapse>
              </Grid>
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
                  fullWidth={loading ? true : false}
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
