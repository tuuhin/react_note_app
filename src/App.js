import Home from "./components/home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/signUp";
import SignIn from "./components/auth/signIn";
import Notes from "./components/home/notes/note";
import UpdateProfile from "./components/profile/updateProfile";
import Auth from "./context/useUser";
import InvalidPage from "./components/common/invalidPage";
import { CssBaseline } from "@mui/material";
import NotesProvider from "./context/useNotes";
import "react-lazy-load-image-component/src/effects/blur.css";
const App = () => {
  return (
    <Auth>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login" element={<SignIn />} />
          <Route exact path="signup" element={<SignUp />} />
          <Route
            exact
            path="/notes"
            element={
              <NotesProvider>
                <Notes />
              </NotesProvider>
            }
          />
          <Route exact path="/profile" element={<UpdateProfile />} />
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
    </Auth>
  );
};

export default App;
