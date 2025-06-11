import ButtonsLayout from "../../components/ButtonsLayout/ButtonsLayout.tsx";
import type { ControlPayload } from "../../components/ButtonsLayout/types.ts";

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
