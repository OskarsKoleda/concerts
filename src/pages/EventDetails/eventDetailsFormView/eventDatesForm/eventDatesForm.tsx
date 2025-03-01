import { useFormContext, useWatch } from "react-hook-form";

import { InputType } from "../../../../components/FormLayout/constants.ts";
import { FormLayout } from "../../../../components/FormLayout/formLayout.tsx";

import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import type { FormFields } from "../../../../components/FormLayout/types.ts";
import { EventCategory } from "../../constants.ts";

export const EventDatesForm = ({ readOnly }: { readOnly: boolean }) => {
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
        readonly: readOnly,
        xs: 12,
      },
    ];
  }

  function getMusicFestivalDateFields(): FormFields {
    return [
      {
        inputType: InputType.date,
        controlName: "festivalStartDate",
        id: "startDate",
        label: "Start Date",
        readonly: readOnly,
        xs: 6,
      },
      {
        inputType: InputType.date,
        controlName: "festivalEndDate",
        id: "endDate",
        label: "End Date",
        readonly: readOnly,
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
      readonly={readOnly}
      title="Dates"
    />
  );
};
