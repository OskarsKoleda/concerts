import { useMemo } from "react";

import ButtonsLayout from "../../../components/ButtonsLayout/ButtonsLayout";

import { getAuthControls } from "./utils";

interface AuthButtonsProps {
  signUp: boolean;
  isLoading?: boolean;
}

const AuthButtons = ({ signUp, isLoading }: AuthButtonsProps) => {
  const controls = useMemo(() => getAuthControls(signUp, isLoading), [signUp, isLoading]);

  return <ButtonsLayout controls={controls} />;
};

export default AuthButtons;
