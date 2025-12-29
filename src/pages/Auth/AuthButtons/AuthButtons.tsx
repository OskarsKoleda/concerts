import { useMemo } from "react";
import ButtonsLayout from "../../../components/ButtonsLayout/ButtonsLayout";
import { getAuthControls } from "./utils";

interface AuthButtonsProps {
  signUp: boolean;
  loading?: boolean;
}

const AuthButtons = ({ signUp, loading }: AuthButtonsProps) => {
  const controls = useMemo(() => getAuthControls(signUp, loading), [signUp, loading]);

  return <ButtonsLayout controls={controls} />;
};

export default AuthButtons;
