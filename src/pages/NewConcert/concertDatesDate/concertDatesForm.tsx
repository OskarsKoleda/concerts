import { useFormContext, useWatch } from "react-hook-form";
import { ConcertData } from "../../../common/types/concert";
import { FormFields } from "../../../components/FormLayout/types";
import { InputType } from "../../../components/FormLayout/constants";
import { FormLayout } from "../../../components/FormLayout/formLayout";

export const ConcertDatesForm = ({ readOnly }: { readOnly: boolean }) => {
  const { control } = useFormContext<ConcertData>();

  const eventType = useWatch({
    control,
    name: "eventType",
  });

  function getConcertDateFields(): FormFields {
    return [
      {
        inputType: InputType.text,
        controlName: "startDate",
        id: "date",
        label: eventType === "Concert" ? "Date" : "Start Date",
        readonly: readOnly,
        xs: eventType === "Festival" ? 6 : 12 
      },
      ...(eventType === "Festival" ? getFestivalSpecificFields() : []),
    ];
  }

  function getFestivalSpecificFields(): FormFields {
    return [
      {
        inputType: InputType.text,
        controlName: "endDate",
        id: "endDate",
        label: "End Date",
        readonly: readOnly,
        xs: 6
      },
    ];
  }

  return (
    <FormLayout
      content={getConcertDateFields()}
      control={control}
      readonly={readOnly}
      title="Dates"
    />
  );
};
