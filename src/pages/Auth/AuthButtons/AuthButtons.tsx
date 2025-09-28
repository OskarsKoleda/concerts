import ButtonsLayout from "../../../components/ButtonsLayout/ButtonsLayout";

import type { ControlPayload } from "../../../common/types/appTypes";

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

  return <ButtonsLayout controls={controls} />;
};

export default AuthButtons;
