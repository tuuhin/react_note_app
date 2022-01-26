import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Container, Card, Button, Stack } from "@mui/material";
import NavBar from "../navBar";
export default function Home() {
  const { user } = useUser();
  return user ? (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Card>
            <Button variant="contained">Get started</Button>
          </Card>
        </Stack>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
