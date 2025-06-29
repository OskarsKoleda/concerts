import ButtonsLayout from "../../../components/ButtonsLayout/ButtonsLayout.tsx";
import type { ControlPayload } from "../../../components/ButtonsLayout/types.ts";

interface AuthButtonsProps {
  signUp: boolean;
  loading?: boolean;
}

const AuthButtons = ({ signUp, loading }: AuthButtonsProps) => {
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

  return <ButtonsLayout controls={controls} renderDeleteButton={false} />;
};

export default AuthButtons;
