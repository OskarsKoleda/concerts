import { useFormContext, useWatch } from "react-hook-form";

import { InputType } from "../../../../components/FormLayout/constants.ts";
import { FormLayout } from "../../../../components/FormLayout/formLayout.tsx";
import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import type { FormFields } from "../../../../components/FormLayout/types.ts";
import { EventCategory } from "../../../../common/enums/appEnums.ts";

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
