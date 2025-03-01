import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { EVENT_TITLE_RULES } from "../../../../common/constants/appConstant.ts";
import { InputType } from "../../../../components/FormLayout/constants.ts";
import { FormLayout } from "../../../../components/FormLayout/formLayout.tsx";

import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import type { FormFields } from "../../../../components/FormLayout/types.ts";
import { eventCategoriesList, EventCategory } from "../../constants.ts";

export const EventFormFields = React.memo(({ readOnly }: { readOnly: boolean }) => {
  const { control } = useFormContext<LocalEventData>();

  const eventCategory = useWatch({
    control,
    name: "eventCategory",
  });

  const getCommonEventFields = (): FormFields => {
    return [
      {
        inputType: InputType.select,
        controlName: "eventCategory",
        id: "eventCategory",
        label: "Event Category",
        children: eventCategoriesList,
      },
      {
        inputType: InputType.text,
        controlName: "eventTitle",
        id: "eventTitle",
        label: "Event Title",
        rules: EVENT_TITLE_RULES,
      },
      {
        inputType: InputType.autocompleteText,
        controlName: "artists",
        id: "artists",
        label: "Artists",
        readonly: readOnly,
        hide: [EventCategory.theatre, EventCategory.creativeEvening].includes(eventCategory),
      },
      {
        inputType: InputType.text,
        controlName: "city",
        id: "city",
        label: "City",
        xs: 6,
      },
      {
        inputType: InputType.text,
        controlName: "location",
        id: "location",
        label: "Location",
        xs: 6,
      },
      {
        inputType: InputType.number,
        controlName: "ticketPrice",
        id: "ticketPrice",
        label: "Ticket Price",
        readonly: readOnly,
        xs: 6,
      },
    ];
  };

  return (
    <FormLayout
      content={getCommonEventFields()}
      control={control}
      readonly={readOnly}
      title="Event Details"
    />
  );
});
