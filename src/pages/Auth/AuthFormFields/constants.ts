import { InputType } from "../../../components/FormLayout/constants.ts";

import type { FormFields } from "../../../components/FormLayout/types.ts";

// TODO: make password hidden
export const loginFields: FormFields = [
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

export const signUpFields: FormFields = [
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
