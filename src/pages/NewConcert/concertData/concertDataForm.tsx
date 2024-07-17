import { useFormContext, useWatch } from "react-hook-form";
import { FormFields } from "../../../components/FormLayout/types";
import { InputType } from "../../../components/FormLayout/constants";
import { FormLayout } from "../../../components/FormLayout/formLayout";
import { ConcertData } from "../../../common/types/concert";

export const ConcertDataForm = ({ readOnly }: { readOnly: boolean }) => {
  const { control } = useFormContext<ConcertData>();

  const eventType = useWatch({
    control,
    name: "eventType",
  });

  // pass something from BE
  function getNewConcertFields(): FormFields {
    return [
      {
        inputType: InputType.select,
        controlName: "eventType",
        id: "eventType",
        label: "Event Type",
        children: ["Festival", "Concert"],
      },
      {
        inputType: InputType.text,
        controlName: "title",
        id: "title",
        label: eventType === "Concert" ? "Band" : "Festival",
      },

      {
        inputType: InputType.text,
        controlName: "year",
        id: "year",
        label: "Year",
      },
      {
        inputType: InputType.text,
        controlName: "city",
        id: "city",
        label: "City",
      },
      {
        inputType: InputType.text,
        controlName: "posterUrl",
        id: "posterUrl",
        label: "Poster URL",
      },
      ...(eventType === "Festival" ? getFestivalSpecificFields() : []),
    ];
  }

  function getFestivalSpecificFields(): FormFields {
    return [
      {
        inputType: InputType.text,
        controlName: "dates",
        id: "dates",
        label: "Dates",
        readonly: readOnly,
      },
      {
        inputType: InputType.text,
        controlName: "bands",
        id: "bands",
        label: "Bands",
        readonly: readOnly,
      },
    ];
  }

  return (
    <FormLayout
      content={getNewConcertFields()}
      control={control}
      readonly={readOnly}
      title="Concert Details"
    />
  );
};