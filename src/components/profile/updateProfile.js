import { useState } from "react";
import { useUser } from "../../context/userContext";
import { Navigate } from "react-router-dom";
import NavBar from "../navBar";
import { Box } from "@mui/system";
import {
  Container,
  Typography,
  Avatar,
  Stack,
  Paper,
  Button,
  TextField,
  InputLabel,
  Collapse,
  Alert,
} from "@mui/material";
import { useFilePicker } from "use-file-picker";
import { addProfile } from "../../services/firebaseStorage";

export default function UpdateProfile() {
  const { user } = useUser();
  const [isCollpased, setIsColaapsed] = useState(false);
  const [alert, setAlert] = useState("");
  const [openFileSelector, { filesContent, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 20,
  });

  const update = (e) => {
    e.preventDefault();
    console.log(filesContent);
    // addProfile(user, filesContent[0]);
  };

  return user ? (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Paper
            sx={{ width: "100%", p: 2 }}
            component="form"
            noValidate
            onSubmit={update}
          >
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Avatar
                sx={{ top: 4, width: 64, height: 64 }}
                onClick={openFileSelector}
                src={filesContent[0] && filesContent[0].content}
              />
              <Typography
                variant="h4"
                sx={{ fontWeight: 500, fontFamilt: "Poppins" }}
              >
                {"Update Profile"}
              </Typography>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Collapse in={isCollpased}>
                <Alert severity={"warning"}>{alert}</Alert>
              </Collapse>
              <InputLabel htmlFor="username">{"UserName"}</InputLabel>
              <TextField fullWidth />
              <InputLabel htmlFor="username">{"About"}</InputLabel>
              <TextField
                fullWidth
                multiline
                minRows={8}
                sx={{ overflowY: "auto" }}
              />
              <Button type="submit" variant="contained" fullWidth>
                submit
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
