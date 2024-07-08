import { observer } from "mobx-react-lite";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../../components/FormLayout/types";
import { InputType } from "../../../components/FormLayout/constants";
import { FormLayout } from "../../../components/FormLayout/formLayout";
import { ConcertData } from "../../../common/types/concert";

export const ConcertDataForm = observer(function ConcertDataForm() {
  const { control } = useFormContext<ConcertData>();

  // pass something from BE
  function getNewConcertFields(): FormFields {
    return [
      {
        inputType: InputType.text,
        controlName: "Band",
        id: "band",
        label: "Band",
      },
      {
        inputType: InputType.text,
        controlName: "Place",
        id: "place",
        label: "Place",
      },
      {
        inputType: InputType.text,
        controlName: "Year",
        id: "year",
        label: "Year",
      },
      {
        inputType: InputType.select,
        controlName: "eventType",
        id: "eventType",
        label: "Even Type",
        children: ["Festival", "Concert"],
      },
    ];
  }

  return <FormLayout content={getNewConcertFields()} control={control} title="Concert Details" />;
});
