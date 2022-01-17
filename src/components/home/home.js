import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Container } from "@mui/material";
import NavBar from "../navBar";
export default function Home() {
  const { user } = useUser();
  return user ? (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs"></Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
