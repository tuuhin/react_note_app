import Home from "./components/home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/signUp";
import SignIn from "./components/auth/signIn";
import Notes from "./components/home/notes/note";
import UpdateProfile from "./components/profile/updateProfile";
import Auth from "./context/useUser";
import { IntlProvider } from "react-intl";
import InvalidPage from "./components/utils/invalidPage";

const App = () => {
  return (
    <Auth>
      <IntlProvider locale={"en-US"}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="login" element={<SignIn />} />
            <Route exact path="signup" element={<SignUp />} />
            <Route exact path="/notes" element={<Notes />} />
            <Route exact path="/profile" element={<UpdateProfile />} />
            <Route path="*" element={<InvalidPage />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </Auth>
  );
};

export default App;
