import type { UseFormProps } from "react-hook-form";

import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import { renderWithProviders } from "../../../../common/utils/testingUtils.tsx";
import { defaultEventValues } from "../../constants.ts";
import FileUpload from "./FileUpload.tsx";

describe("UploadFileButton", () => {
  it.skip("should render correctly", () => {
    const formConfig: UseFormProps<LocalEventData> = {
      defaultValues: defaultEventValues,
      mode: "onChange",
      shouldUnregister: true,
    };

    renderWithProviders<LocalEventData>(
      <FileUpload buttonTitle="Add Poster" formFieldName="image" />,
      { formConfig },
    );

    // TODO: add tests
  });
});
