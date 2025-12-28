import { useFormContext, useWatch } from "react-hook-form";

import { EventCategory } from "../../../common/enums/appEnums.ts";
import FormLayout from "../../../components/FormLayout/FormLayout.tsx";
import { InputType } from "../../../components/FormLayout/constants.ts";

import type { LocalEventData } from "../../../common/types/eventTypes.ts";
import type { FormFields } from "../../../components/FormLayout/types.ts";

const EventDateFields = () => {
  const eventDateFields: FormFields = [
    {
      inputType: InputType.Date,
      controlName: "date",
      id: "eventDate",
      label: "Date",
      xs: 4,
    },
  ];

  const musicFestivalDateFields: FormFields = [
    {
      inputType: InputType.Date,
      controlName: "endDate",
      id: "endDate",
      label: "End Date",
      xs: 4,
    },
  ];

  const { control } = useFormContext<LocalEventData>();

  const eventCategory = useWatch({
    control: control,
    name: "category",
  });

  const dateFields =
    eventCategory === EventCategory.MusicFestival
      ? [...eventDateFields, ...musicFestivalDateFields]
      : eventDateFields;

  return <FormLayout content={dateFields} control={control} />;
};

export default EventDateFields;
