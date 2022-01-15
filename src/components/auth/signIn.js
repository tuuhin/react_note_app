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
import { signIn } from "../../services/authservice";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { user } = useUser();

  const email = useRef();
  const password = useRef();
  const [collapsed, setCollapsed] = useState(false);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("");

  const signUserIn = async (e) => {
    console.log("hi");
    e.preventDefault();
    try {
      await signIn(email.current.value, password.current.value);
    } catch (e) {
      console.log(e);
      setCollapsed(true);
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
        <Box component="form" onSubmit={signUserIn}>
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
            Sign In
          </Button>
        </Box>
        <Grid container justifyContent={"flex-end"} sx={{ mt: 1 }}>
          <Grid item>
            <Button
              sx={{ textTransform: "none" }}
              variant="text"
              component={Link}
              to="/signup"
            >
              Dont have a account? Sign up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <Navigate to="/" />
  );
}
