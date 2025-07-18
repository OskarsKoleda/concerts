import { useFormContext, useWatch } from "react-hook-form";

import { EventCategory } from "../../../../common/enums/appEnums.ts";
import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import FormLayout from "../../../../components/FormLayout/FormLayout.tsx";

import { eventDateFields, musicFestivalDateFields } from "./constants.ts";

const EventDatesForm = () => {
  const { control } = useFormContext<LocalEventData>();

  const eventCategory = useWatch({
    control,
    name: "eventCategory",
  });

  const datesFormContent =
    eventCategory === EventCategory.musicFestival ? musicFestivalDateFields : eventDateFields;

  return <FormLayout content={datesFormContent} control={control} title="Dates" />;
};

export default EventDatesForm;
