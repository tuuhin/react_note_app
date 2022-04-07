import { Container, Stack, Typography, Fade } from "@mui/material";
import { Navigate, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useUser } from "../../context/useUser";
import NavBar from "../common/navBar";
import { BlackButton } from "../common/styled";
import bookImage from "../img/home.jpg";
import Quotes from "./notes/quote";

export default function Home() {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <NavBar />
      <Fade in duration={2000}>
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
            <LazyLoadImage
              src={bookImage}
              effect="blur"
              style={{
                boxShadow: "0px 5px 12px 2px rgba(80, 80, 80, 0.5)",
                transform: "scale(0.7)",
              }}
            />
          </Stack>
        </Container>
      </Fade>
      <footer>
        <Quotes />
      </footer>
    </>
  );
}
