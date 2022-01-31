import Home from "./components/home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/signUp";
import SignIn from "./components/auth/signIn";
import Notes from "./components/home/notes/note";
import UpdateProfile from "./components/profile/updateProfile";
import Editor from "./components/home/editor/editor";
import Auth from "./context/userContext";
import { IntlProvider } from "react-intl";
import { useState } from "react";

const App = () => {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
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
            <Route
              exact
              path="/editor"
              element={
                <Editor
                  value={value}
                  onChange={(e) => {
                    setValue(e);
                    console.log(value);
                  }}
                />
              }
            />
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
      </IntlProvider>
    </Auth>
  );
};

export default App;
