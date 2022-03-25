import {
  Alert,
  Container,
  TextField,
  Stack,
  Collapse,
  Fade,
  Grid,
  Slide,
  InputLabel,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { BlackButton } from "../common/styled";
import { useState } from "react";
import { signIn } from "../../data/services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { SignInMeta } from "./headers";
import image from "../img/prof.jpg";
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
      setAlertHead("error");
      setAlertBody(e.code.replace("auth/", ""));
    }
  };
  return !user ? (
    <Stack direction={"row"} justifyContent={"space-around"}>
      <Fade in timeout={1800}>
        <img alt="" src={image} style={{ height: "100vh" }} />
      </Fade>
      <Slide in timeout={1400} direction={"left"}>
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
            <SignInMeta />
            <SocialAuth />
            <Divider sx={{ width: "100%" }} />
            <Collapse in={collapsed} sx={{ width: "100%", mt: 1 }}>
              <Alert sx={{ borderRadius: 2 }} severity={alertHead}>
                {alertBody.toUpperCase()}
              </Alert>
            </Collapse>
            <Grid
              container
              component="form"
              noValidate
              spacing={1.2}
              onSubmit={signUserIn}
              sx={{ width: "100%" }}
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
                  autoFocus
                  id="email"
                  name="email"
                  autoComplete="email"
                  onFocus={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      setEmailError(false);
                    }
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
                    if (collapsed) {
                      setCollapsed(false);
                      setPasswordError(false);
                    }
                  }}
                />
              </Grid>
              <div sx={{ height: 10 }}></div>

              <Grid item lg={12} sm={12}>
                <BlackButton
                  fullWidth
                  variant={"contained"}
                  type="submit"
                  disabled={loading}
                  size="large"
                >
                  {!loading ? "Sign In" : "Authenticating..."}
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
