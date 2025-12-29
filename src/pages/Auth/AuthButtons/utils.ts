import type { ControlPayload } from "../../../common/types/appTypes";

export const getAuthControls = (signUp: boolean, loading?: boolean): ControlPayload[] => [
  {
    color: "primary",
    id: signUp ? "btnSignUp" : "btnLogin",
    text: signUp ? "Sign Up" : "Login",
    variant: "contained",
    type: "submit",
    loading,
  },
];
