import { Typography } from "@mui/material";

import { authHelperCaption } from "./styles.ts";
import { useAuthMode } from "../hooks/useAuthMode.ts";

interface AuthHelperCaptionProps {
  resetForm: () => void;
}

const AuthHelperCaption = ({ resetForm }: AuthHelperCaptionProps) => {
  const { isSignUpMode, setToggleMode } = useAuthMode();
  const toggleModeHandler = () => {
    setToggleMode();
    resetForm();
  };

  return (
    <Typography variant="body2" color="textSecondary" sx={authHelperCaption}>
      {isSignUpMode ? "Already have an account? " : "Don't have an account? "}
      <span onClick={toggleModeHandler}>{isSignUpMode ? "Log In" : "Sign Up"}</span>
    </Typography>
  );
};

export default AuthHelperCaption;
