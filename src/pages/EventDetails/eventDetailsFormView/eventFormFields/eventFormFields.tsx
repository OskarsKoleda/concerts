import { useFormContext, useWatch } from "react-hook-form";

import { eventCategoriesList } from "../../../../common/constants/appConstant.ts";
import {
  CITY_RULES,
  EVENT_TITLE_RULES,
  TICKET_PRICE_RULES,
} from "../../../../common/constants/validations.ts";
import { EventCategory } from "../../../../common/enums/appEnums.ts";
import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import { InputType } from "../../../../components/FormLayout/constants.ts";
import FormLayout from "../../../../components/FormLayout/FormLayout.tsx";
import type { FormFields } from "../../../../components/FormLayout/types.ts";

export const EventFormFields = () => {
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
        hide: [EventCategory.theatre, EventCategory.creativeEvening].includes(eventCategory),
      },
      {
        inputType: InputType.text,
        controlName: "city",
        id: "city",
        label: "City",
        xs: 6,
        rules: CITY_RULES,
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
        xs: 6,
        rules: TICKET_PRICE_RULES,
      },
    ];
  };

  // TODO: add more fields for specific event categories

  return <FormLayout content={getCommonEventFields()} control={control} title="Event Details" />;
};
