import { useFormContext, useWatch } from "react-hook-form";

import { eventCategoriesList } from "../../../../common/constants/appConstant.ts";
import {
  CITY_RULES,
  EVENT_TITLE_RULES,
  TICKET_PRICE_RULES,
} from "../../../../common/constants/validations.ts";
import { EventCategory } from "../../../../common/enums/appEnums.ts";
import { InputType } from "../../../../components/FormLayout/constants.ts";
import FormLayout from "../../../../components/FormLayout/FormLayout.tsx";

import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import type { FormFields } from "../../../../components/FormLayout/types.ts";

const EventFormFields = () => {
  const { control } = useFormContext<LocalEventData>();

  const eventCategory = useWatch({
    control,
    name: "category",
  });

  const getCommonEventFields = (): FormFields => {
    return [
      {
        inputType: InputType.Select,
        controlName: "category",
        id: "category",
        label: "Event Category",
        children: eventCategoriesList,
      },
      {
        inputType: InputType.Text,
        controlName: "title",
        id: "title",
        label: "Event Title",
        rules: EVENT_TITLE_RULES,
      },
      {
        inputType: InputType.AutocompleteText,
        controlName: "bands",
        id: "bands",
        label: "Bands",
        hide: [EventCategory.Theatre, EventCategory.CreativeEvening].includes(eventCategory),
      },
      {
        inputType: InputType.Text,
        controlName: "city",
        id: "city",
        label: "City",
        xs: 6,
        rules: CITY_RULES,
      },
      {
        inputType: InputType.Text,
        controlName: "location",
        id: "location",
        label: "Location",
        xs: 6,
      },
      {
        inputType: InputType.Number,
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

export default EventFormFields;
