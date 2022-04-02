import { Container, Stack, Typography, Fade } from "@mui/material";
import { Navigate, Link } from "react-router-dom";
import { useUser } from "../../context/useUser";
import NavBar from "../common/navBar";
import { BlackButton, Image } from "../common/styled";
import bookImage from "../img/home.jpg";
import Quotes from "./notes/quote";
export default function Home() {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <NavBar />
      <Fade in={2000}>
        <Container maxWidth="lg">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{ height: "80vh" }}
            spacing={5}
          >
            <Container
              maxWidth="xs"
              sx={{ display: "flex", gap: 1.2, flexDirection: "column" }}
            >
              <Typography
                variant={"h2"}
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                }}
              >
                {"Let's make some notes"}
              </Typography>

              <Typography
                variant={"subtitle1"}
                sx={{
                  letterSpacing: "-0.8px",
                  fonntWeight: 300,
                  fontFamily: "Poppins",
                }}
              >
                {
                  "It's better to note down than to memorize. Get started with afternotes, a note app which helps you to to make maintainable notes."
                }
              </Typography>
              <BlackButton component={Link} to="/notes">
                {"Get started"}
              </BlackButton>
            </Container>

            <Image src={bookImage} alt="not-found" />
          </Stack>
        </Container>
      </Fade>
      <footer>
        <Quotes />
      </footer>
    </>
  );
}
