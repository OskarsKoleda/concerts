import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { UploadFileButton } from "../uploadFileButton.tsx";
import type { LocalEventData } from "../../../../../common/types/eventTypes.ts";
import { defaultValues } from "../../../constants.ts";

describe("UploadFileButton", () => {
  it("should render correctly", async () => {
    const methods = useForm<LocalEventData>({
      defaultValues,
      mode: "onChange",
      shouldUnregister: true,
    });

    const { register } = methods;

    // TODO: should be wrapped with form provider before rendering
    render(
      <UploadFileButton
        buttonTitle="Add Poster"
        formFieldName="posterImage"
        register={register}
        readonly={false}
      />,
    );

    screen.debug();
  });
});
