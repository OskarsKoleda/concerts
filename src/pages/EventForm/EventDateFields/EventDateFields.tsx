import { useFormContext, useWatch } from "react-hook-form";

import { EventCategory } from "../../../common/enums/appEnums.ts";
import FormLayout from "../../../components/FormLayout/FormLayout.tsx";

import { eventDateFields, musicFestivalDateFields } from "./constants.ts";

import type { LocalEventData } from "../../../common/types/eventTypes.ts";

const EventDateFields = () => {
  const { control } = useFormContext<LocalEventData>();

  const eventCategory = useWatch({
    control,
    name: "category",
  });

  const datesFormContent =
    eventCategory === EventCategory.MusicFestival ? musicFestivalDateFields : eventDateFields;

  return <FormLayout content={datesFormContent} control={control} title="Dates" />;
};

export default EventDateFields;
