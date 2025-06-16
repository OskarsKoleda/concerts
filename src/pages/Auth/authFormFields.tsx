import { useFormContext } from "react-hook-form";

import { InputType } from "../../components/FormLayout/constants.ts";
import type { FormFields } from "../../components/FormLayout/types.ts";
import { FormLayout } from "../../components/FormLayout/formLayout.tsx";
import type { AuthUserProfile } from "../../common/types/eventTypes.ts";

type AuthFormFieldsProps = {
  signUp: boolean;
};

export const AuthFormFields = ({ signUp }: AuthFormFieldsProps) => {
  const { control } = useFormContext<AuthUserProfile>();

  const getLoginFields = (): FormFields => {
    return [
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
  };

  const getSignUpFields = (): FormFields => {
    return [
      {
        inputType: InputType.text,
        controlName: "username",
        id: "username",
        label: "Username",
      },
      ...getLoginFields(),
      {
        inputType: InputType.text,
        controlName: "repeatPassword",
        id: "repeatPassword",
        label: "Repeat Password",
      },
    ];
  };

  return (
    <FormLayout
      content={signUp ? getSignUpFields() : getLoginFields()}
      control={control}
      title={signUp ? "Sign Up" : "Login"}
    />
  );
};
