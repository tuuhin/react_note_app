import Home from "./components/home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import SignUp from "./components/auth/signUp";
import SignIn from "./components/auth/signIn";
import Notes from "./components/home/notes/note";
import Auth from "./context/userContext";
const App = () => {
  return (
    <Auth>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login" element={<SignIn />} />
          <Route exact path="signup" element={<SignUp />} />
          <Route exact path="/notes" element={<Notes />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth>
  );
};

export default App;
