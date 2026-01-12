import { useFormContext, useWatch } from "react-hook-form";

import { eventCategoriesList } from "../../../common/constants/appConstant";
import {
  CITY_RULES,
  EVENT_TITLE_RULES,
  TICKET_PRICE_RULES,
} from "../../../common/constants/validations";
import { EventCategory } from "../../../common/enums/appEnums";
import { InputType } from "../../../components/FormLayout/constants";
import FormLayout from "../../../components/FormLayout/FormLayout";

import type { LocalEventData } from "../../../common/types/eventTypes";
import type { FormFields } from "../../../components/FormLayout/types";

const CommonEventFields = () => {
  const { control } = useFormContext<LocalEventData>();

  const eventCategory = useWatch({
    control,
    name: "category",
  });

  const commonEventFields: FormFields = [
    {
      inputType: InputType.Text,
      controlName: "title",
      id: "title",
      label: "Event Title",
      rules: EVENT_TITLE_RULES,
    },
    {
      inputType: InputType.Select,
      controlName: "category",
      id: "category",
      label: "Event Category",
      children: eventCategoriesList,
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
      controlName: "venue",
      id: "venue",
      label: "Venue",
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

  return <FormLayout content={commonEventFields} control={control} />;
};

export default CommonEventFields;
