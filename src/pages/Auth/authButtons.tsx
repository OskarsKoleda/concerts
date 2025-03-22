import type { ControlPayload } from "../../components/ButtonsLayout/types.ts";
import { ButtonsLayout } from "../../components/ButtonsLayout/buttonsLayout.tsx";

type AuthButtonsProps = {
  signUp: boolean;
  loading?: boolean;
};

export const AuthButtons = ({ signUp, loading }: AuthButtonsProps) => {
  const controls: ControlPayload[] = [
    {
      color: "primary",
      id: signUp ? "btnSignUp" : "btnLogin",
      text: signUp ? "Sign Up" : "Login",
      variant: "outlined",
      type: "submit",
      loading: loading,
    },
  ];

  return <ButtonsLayout controls={controls} showDelete={false} />;
};
