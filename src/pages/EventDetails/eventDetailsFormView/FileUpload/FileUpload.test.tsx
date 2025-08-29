import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../common/utils/testingUtils.tsx";
import { defaultEventValues } from "../../constants.ts";

import FileUpload from "./FileUpload.tsx";

import type { UseFormProps } from "react-hook-form";
import type { LocalEventData } from "../../../../common/types/eventTypes.ts";

describe("UploadFileButton", () => {
  const formConfig: UseFormProps<LocalEventData> = {
    defaultValues: defaultEventValues,
    mode: "onChange",
    shouldUnregister: true,
  };

  test("renders button with correct title", () => {
    renderWithProviders<LocalEventData>(
      <FileUpload buttonTitle="Add Poster" formFieldName="image" />,
      { formConfig },
    );

    expect(screen.getByRole("button", { name: /add poster/i })).toBeInTheDocument();
  });

  test("shows 'No file chosen' when no file is selected", () => {
    renderWithProviders<LocalEventData>(<FileUpload buttonTitle="Upload" formFieldName="image" />, {
      formConfig,
    });

    expect(screen.getByText(/no file chosen/i)).toBeInTheDocument();
  });
});
