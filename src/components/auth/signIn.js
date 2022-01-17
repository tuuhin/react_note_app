import {
  Typography,
  Alert,
  Button,
  Container,
  TextField,
  Stack,
  Collapse,
  Fade,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { signIn } from "../../services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("");

  const signUserIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (e) {
      console.log(e);
      setCollapsed(true);
      setAlertHead("warning");
      setAlertBody(e.code);
    }
  };
  return !user ? (
    <Fade in timeout={1000}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <img
          style={{ height: "100vh" }}
          alt=""
          src={
            "https://images.unsplash.com/photo-1518188689134-aa7854b27574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80"
          }
        />

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
              onSubmit={signUserIn}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <Collapse in={collapsed} sx={{ width: "100%" }}>
                <Alert severity={alertHead}>{alertBody}</Alert>
              </Collapse>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                onFocus={() => setCollapsed(false)}
              />

              <TextField
                value={password}
                onChangeCapture={(e) => setPassword(e.target.value)}
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
              />

              <Button fullWidth variant={"contained"} type="submit">
                Sign In
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
