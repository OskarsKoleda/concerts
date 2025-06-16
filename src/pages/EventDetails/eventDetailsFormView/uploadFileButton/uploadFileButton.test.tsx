import type { UseFormProps } from "react-hook-form";

import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import { renderWithProviders } from "../../../../common/utils/testingUtils.tsx";
import { defaultEventValues } from "../../constants.ts";

import { UploadFileButton } from "./uploadFileButton.tsx";

describe("UploadFileButton", () => {
  it.skip("should render correctly", () => {
    const formConfig: UseFormProps<LocalEventData> = {
      defaultValues: defaultEventValues,
      mode: "onChange",
      shouldUnregister: true,
    };

    renderWithProviders<LocalEventData>(
      <UploadFileButton buttonTitle="Add Poster" formFieldName="posterImage" readonly={false} />,
      { formConfig },
    );

    // TODO: add tests
  });
});
