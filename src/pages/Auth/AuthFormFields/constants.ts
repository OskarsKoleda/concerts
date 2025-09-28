import { InputType } from "../../../components/FormLayout/constants.ts";

import type { FormField, FormFields } from "../../../components/FormLayout/types.ts";

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

const age: FormField = {
  inputType: InputType.Text,
  controlName: "age",
  id: "age",
  label: "Age",
};

export const signUpFields: FormFields = [
  {
    inputType: InputType.Text,
    controlName: "name",
    id: "name",
    label: "Name",
  },
  ...[loginFields[0], age, loginFields[1]],
  {
    inputType: InputType.Text,
    controlName: "repeatPassword",
    id: "repeatPassword",
    label: "Repeat Password",
  },
];
