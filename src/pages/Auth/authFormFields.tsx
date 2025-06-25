import { useFormContext } from "react-hook-form";

import type { AuthUserProfile } from "../../common/types/eventTypes.ts";
import { InputType } from "../../components/FormLayout/constants.ts";
import FormLayout from "../../components/FormLayout/FormLayout.tsx";
import type { FormFields } from "../../components/FormLayout/types.ts";

interface AuthFormFieldsProps {
  signUp: boolean;
}

const AuthFormFields = ({ signUp }: AuthFormFieldsProps) => {
  const { control } = useFormContext<AuthUserProfile>();

  const loginFields: FormFields = [
    {
      inputType: InputType.text,
      controlName: "email",
      id: "email",
      label: "Email",
    },
    {
      inputType: InputType.text,
      controlName: "password",
      id: "password",
      label: "Password",
    },
  ];

  const signUpFields: FormFields = [
    {
      inputType: InputType.text,
      controlName: "username",
      id: "username",
      label: "Username",
    },
    ...loginFields,
    {
      inputType: InputType.text,
      controlName: "repeatPassword",
      id: "repeatPassword",
      label: "Repeat Password",
    },
  ];

  return (
    <FormLayout
      content={signUp ? signUpFields : loginFields}
      control={control}
      title={signUp ? "Sign Up" : "Login"}
    />
  );
};

export default AuthFormFields;
