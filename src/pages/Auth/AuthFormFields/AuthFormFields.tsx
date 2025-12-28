import { useFormContext } from "react-hook-form";

import { loginFields, signUpFields } from "./constants.ts";

import type { UserProfile } from "../../../common/types/userTypes.ts";
import FormLayout from "../../../components/FormLayout/FormLayout.tsx";

interface AuthFormFieldsProps {
  signUp: boolean;
}

const AuthFormFields = ({ signUp }: AuthFormFieldsProps) => {
  const { control } = useFormContext<UserProfile>();

  return <FormLayout content={signUp ? signUpFields : loginFields} control={control} />;
};

export default AuthFormFields;
