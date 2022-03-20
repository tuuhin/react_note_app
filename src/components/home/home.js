import { Navigate, Link } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { Container, Stack, Typography, Fade } from "@mui/material";
import NavBar from "../common/navBar";
import { BlackButton } from "../../utils/styled";
export default function Home() {
  const { user } = useUser();
  return user ? (
    <>
      <NavBar />
      <Container component="main" maxWidth="lg" sx={{ mt: 2 }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          height={"80vh"}
        >
          <Fade in timeout={2000}>
            <Typography
              variant={"h2"}
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {"Boost your productivity with one tool"}
            </Typography>
          </Fade>
          <Typography
            variant={"subtitle2"}
            sx={{
              color: "gray",
              fontFamily: "Poppins",
            }}
          >
            {"plan organize for free"}
          </Typography>
          <BlackButton variant="contained" component={Link} to="/notes">
            {"Get started"}
          </BlackButton>
        </Stack>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
