import React from "react";
import { useFormContext } from "react-hook-form";

import { EVENT_TITLE_RULES } from "../../../common/constants/appConstant";
import { InputType } from "../../../components/FormLayout/constants";
import { FormLayout } from "../../../components/FormLayout/formLayout";

import type { LocalEventData } from "../../../common/types/eventTypes.ts";
import type { FormFields } from "../../../components/FormLayout/types";
import { eventCategoriesList } from "../constants.ts";

export const EventForm = React.memo(({ readOnly }: { readOnly: boolean }) => {
  const { control } = useFormContext<LocalEventData>();

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
