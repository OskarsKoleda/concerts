import { useSearchParams } from "react-router-dom";

import { AuthMode } from "../constants";

interface UseAuthMode {
  isSignUpMode: boolean;
  setToggleMode: () => void;
}

export const useAuthMode = (): UseAuthMode => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode") ?? AuthMode.Login;
  const isSignUpMode = mode === AuthMode.Signup;

  const setToggleMode = () => {
    setSearchParams({ mode: isSignUpMode ? AuthMode.Login : AuthMode.Signup });
  };

  return { isSignUpMode, setToggleMode };
};
