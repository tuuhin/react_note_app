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
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { signUp } from "../../services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
import SignInWithGoggleButton from "./signInWithGoggleButton";
import { validateEmail } from "../../utils/validators";
export default function SignUp() {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const signNewUser = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setEmailError(true);
    if (!password) return setPasswordError(true);
    try {
      await signUp(email, password);
    } catch (e) {
      setCollapsed(true);
      console.log(e);
      setAlertHead("warning");
      setAlertBody(e.code);
    }
  };
  return !user ? (
    <Fade in timeout={800}>
      <Stack
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <img
          style={{ height: "100vh" }}
          alt=""
          src={
            "https://images.unsplash.com/photo-1620387510136-82f3bd6d39d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
        />
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
                Already have a account
              </Typography>
              <Button
                sx={{ textTransform: "none", mt: 1, mb: 1 }}
                variant="text"
                component={Link}
                to="/login"
              >
                Sign up
              </Button>
            </Stack>

            <SignInWithGoggleButton />
            <Divider sx={{ mb: 1, width: "100%" }}>
              <Typography
                variant="caption"
                sx={{ color: "gray", position: "relative", top: "2px" }}
              >
                OR
              </Typography>
            </Divider>
            <Stack
              component="form"
              noValidate
              spacing={1}
              sx={{ width: "100%" }}
              onSubmit={signNewUser}
            >
              <Collapse in={collapsed} sx={{ width: "100%" }}>
                <Alert severity={alertHead}>{alertBody}</Alert>
              </Collapse>
              <InputLabel
                htmlFor="email"
                sx={{ fontFamily: "Poppins", fontWeight: "500" }}
              >
                Email
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
                sx={{ fontFamily: "Poppins", fontWeight: "500" }}
              >
                Password
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
                Register
              </Button>
            </Stack>
          </Box>
        </Container>
      </Stack>
    </Fade>
  ) : (
    <Navigate to="/" />
  );
}
