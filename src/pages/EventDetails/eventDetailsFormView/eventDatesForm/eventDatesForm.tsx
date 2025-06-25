import { useFormContext, useWatch } from "react-hook-form";

import { EventCategory } from "../../../../common/enums/appEnums.ts";
import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import { InputType } from "../../../../components/FormLayout/constants.ts";
import FormLayout from "../../../../components/FormLayout/FormLayout.tsx";
import type { FormFields } from "../../../../components/FormLayout/types.ts";

export const EventDatesForm = () => {
  const { control } = useFormContext<LocalEventData>();

  const eventCategory = useWatch({
    control,
    name: "eventCategory",
  });

  function getEventDateFields(): FormFields {
    return [
      {
        inputType: InputType.date,
        controlName: "eventDate",
        id: "eventDate",
        label: "Date",
        xs: 12,
      },
    ];
  }

  function getMusicFestivalDateFields(): FormFields {
    return [
      {
        inputType: InputType.date,
        controlName: "festivalEndDate",
        id: "endDate",
        label: "End Date",
        xs: 6,
      },
    ];
  }

  return (
    <FormLayout
      content={
        eventCategory === EventCategory.musicFestival
          ? getMusicFestivalDateFields()
          : getEventDateFields()
      }
      control={control}
      title="Dates"
    />
  );
};
