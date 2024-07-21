import { useFormContext, useWatch } from "react-hook-form";
import { FormFields } from "../../../components/FormLayout/types";
import { InputType } from "../../../components/FormLayout/constants";
import { FormLayout } from "../../../components/FormLayout/formLayout";
import { ConcertData } from "../../../common/types/concert";

export const ConcertMainDataForm = ({ readOnly }: { readOnly: boolean }) => {
  const { control } = useFormContext<ConcertData>();

  const eventType = useWatch({
    control,
    name: "eventType",
  });

  // pass something from BE
  function getConcertFields(): FormFields {
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
        label: eventType === "Concert" ? "Concert Title" : "Festival Title",
      },
      {
        inputType: InputType.autocompleteText,
        controlName: "bands",
        id: "bands",
        label: "Bands",
        readonly: readOnly,
      },
      {
        inputType: InputType.text,
        controlName: "city",
        id: "city",
        label: "City",
        xs: 6
      },

      {
        inputType: InputType.number,
        controlName: "ticketPrice",
        id: "price",
        label: "Ticket Price",
        readonly: readOnly,
        xs: 6
      },
      {
        inputType: InputType.text,
        controlName: "posterUrl",
        id: "posterUrl",
        label: "Poster URL",
      },
    ];
  }



  return (
    <FormLayout
      content={getConcertFields()}
      control={control}
      readonly={readOnly}
      title="Concert Details"
    />
  );
};
