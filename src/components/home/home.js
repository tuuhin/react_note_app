import { Navigate, Link } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { Container, Stack, Typography } from "@mui/material";
import NavBar from "../utils/navBar";
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
          <Typography
            variant={"h2"}
            sx={{ fontFamily: "Poppins", fontWeight: 600 }}
          >
            {"Boost your productivity with one tool"}
          </Typography>
          <Typography
            variant={"body"}
            sx={{
              color: "gray",
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "1.25em",
            }}
          >
            Plan Organize for Free
          </Typography>
          <BlackButton variant="contained" component={Link} to="/notes">
            Get started
          </BlackButton>
        </Stack>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
