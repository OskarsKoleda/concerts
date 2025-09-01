import { InputType } from "../../../components/FormLayout/constants.ts";

import type { FormFields } from "../../../components/FormLayout/types.ts";

// TODO: make password hidden
export const loginFields: FormFields = [
  {
    inputType: InputType.Text,
    controlName: "email",
    id: "email",
    label: "Email",
  },
  {
    inputType: InputType.Text,
    controlName: "password",
    id: "password",
    label: "Password",
  },
];

export const signUpFields: FormFields = [
  {
    inputType: InputType.Text,
    controlName: "username",
    id: "username",
    label: "Username",
  },
  ...loginFields,
  {
    inputType: InputType.Text,
    controlName: "repeatPassword",
    id: "repeatPassword",
    label: "Repeat Password",
  },
];
