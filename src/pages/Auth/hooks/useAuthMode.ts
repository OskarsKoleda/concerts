import { useSearchParams } from "react-router-dom";

import { AuthMode } from "../constants";

export const useAuthMode = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode") ?? AuthMode.Login;
  const isSignUpMode = mode === AuthMode.Signup;

  const toggleMode = () => {
    setSearchParams({ mode: isSignUpMode ? AuthMode.Login : AuthMode.Signup });
  };

  return { isSignUpMode, toggleMode };
};
