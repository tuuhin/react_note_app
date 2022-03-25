import { Typography, Stack } from "@mui/material";
import { StyledLink } from "../common/styled";
export const SignUpMetaData = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{ fontFamily: "Poppins", fontWeight: "600" }}
      >
        Get's started.
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: "gray",
            fontFamily: "Poppins",
            textTransform: "capitalize",
          }}
        >
          {"Already had a account?"}
        </Typography>
        <div style={{ width: 10 }}></div>
        <StyledLink to="/login">{"  Sign In"}</StyledLink>
      </Stack>
    </>
  );
};
export const SignInMeta = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
        }}
      >
        {" Welcome Back!"}
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: "gray",
            fontFamily: "Poppins",
            textTransform: "capitalize",
          }}
        >
          {"Don't have account?"}
        </Typography>
        <div style={{ width: 10 }}></div>
        <StyledLink to="/signup">{"Sign up"}</StyledLink>
      </Stack>
    </>
  );
};
