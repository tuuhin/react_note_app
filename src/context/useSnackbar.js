import { useState, createContext, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
export const AlertContext = createContext();
export const useSnackbar = () => useContext(AlertContext);

const AlertProvider = (props) => {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [alertHead, setAlertHead] = useState("warning");
  const [alertBody, setAlertBody] = useState("");

  const closeSnackBar = () => setIsSnackBarOpen(false);
  const value = { setAlertBody, setAlertHead, setIsSnackBarOpen };
  return (
    <AlertContext.Provider value={value}>
      {props.children}
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        onClose={closeSnackBar}
      >
        <Alert
          severity={alertHead}
          elevation={3}
          onClose={closeSnackBar}
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            borderRadius: 2,
            textTransform: "capitalize",
          }}
        >
          {alertBody}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
export default AlertProvider;
