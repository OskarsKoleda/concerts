import { useFormContext } from "react-hook-form";

import FormLayout from "../../../components/FormLayout/FormLayout.tsx";

import { loginFields, signUpFields } from "./constants.ts";

import type { AuthUserProfile } from "../../../common/types/eventTypes.ts";

interface AuthFormFieldsProps {
  signUp: boolean;
}

const AuthFormFields = ({ signUp }: AuthFormFieldsProps) => {
  const { control } = useFormContext<AuthUserProfile>();

  return (
    <FormLayout
      content={signUp ? signUpFields : loginFields}
      control={control}
      title={signUp ? "Sign Up" : "Login"}
    />
  );
};

export default AuthFormFields;
