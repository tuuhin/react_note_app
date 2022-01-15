import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Button, Container } from "@mui/material";
export default function Home() {
  const { user } = useUser();
  return user ? (
    <Container component="main" maxWidth="xs">
      <img
        scr={
          "https://images.unsplash.com/photo-1642088163639-aac034d1af28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        }
        alt="blank"
      />
      <Button variant={"contained"}>Get Started </Button>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}
