import { InputType } from "../../../../components/FormLayout/constants.ts";

import type { FormFields } from "../../../../components/FormLayout/types.ts";

export const eventDateFields: FormFields = [
  {
    inputType: InputType.date,
    controlName: "date",
    id: "eventDate",
    label: "Date",
    xs: 12,
  },
];

export const musicFestivalDateFields: FormFields = [
  {
    inputType: InputType.date,
    controlName: "endDate",
    id: "endDate",
    label: "End Date",
    xs: 6,
  },
];
