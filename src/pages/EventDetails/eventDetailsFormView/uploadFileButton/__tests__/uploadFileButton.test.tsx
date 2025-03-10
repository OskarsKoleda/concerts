import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { UploadFileButton } from "../uploadFileButton.tsx";

describe("UploadFileButton", () => {
  it("should render correctly", async () => {
    // const methods = useForm<LocalEventData>({
    //   defaultValues,
    //   mode: "onChange",
    //   shouldUnregister: true,
    // });

    // TODO: should be wrapped with form provider before rendering
    render(
      <UploadFileButton buttonTitle="Add Poster" formFieldName="posterImage" readonly={false} />,
    );
  });
});
