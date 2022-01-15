import {
  Avatar,
  Typography,
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import { MdLock } from "react-icons/md";
import { useRef, useState } from "react";
import { signUp } from "../../services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
export default function SignUp() {
  const email = useRef();
  const { user } = useUser();
  const password = useRef();
  const username = useRef();
  const [collapsed, setCollapsed] = useState(false);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("");

  const signNewUser = async (e) => {
    e.preventDefault();

    try {
      await signUp(
        email.current.value,
        password.current.value,
        username.current.value
      );
    } catch (e) {
      setCollapsed(true);
      console.log(e);
      setAlertHead("warning");
      setAlertBody(e.code);
    }
  };
  return !user ? (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MdLock />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign in
        </Typography>

        <Collapse in={collapsed} sx={{ width: "100%" }}>
          <Alert severity={alertHead}>{alertBody}</Alert>
        </Collapse>
        <Box component="form" onSubmit={signNewUser}>
          <TextField
            fullWidth
            label="username"
            margin="normal"
            inputRef={username}
          />

          <TextField
            inputRef={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onFocus={() => setCollapsed(false)}
          />

          <TextField
            inputRef={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button fullWidth variant={"contained"} type="submit">
            Sign Up
          </Button>
        </Box>
        <Grid container justifyContent={"flex-end"} sx={{ mt: 1 }}>
          <Grid item>
            <Button
              sx={{ textTransform: "none" }}
              variant="text"
              component={Link}
              to="/login"
            >
              Already have a account ? Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <Navigate to="/" />
  );
}
