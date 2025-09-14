import { InputType } from "../../../components/FormLayout/constants";

import type { FormFields } from "../../../components/FormLayout/types";

export const eventDateFields: FormFields = [
  {
    inputType: InputType.Date,
    controlName: "date",
    id: "eventDate",
    label: "Date",
    xs: 12,
  },
];

export const musicFestivalDateFields: FormFields = [
  {
    inputType: InputType.Date,
    controlName: "endDate",
    id: "endDate",
    label: "End Date",
    xs: 6,
  },
];
