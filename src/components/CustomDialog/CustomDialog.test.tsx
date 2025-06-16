import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../common/utils/testingUtils";

import CustomDialog from "./CustomDialog";
import type { CustomDialogProps } from "./types";

const setShowMock = vi.fn();
const onConfirmMock = vi.fn();

const customDialogProps: CustomDialogProps = {
  show: true,
  title: "My Dialog",
  content: "My dialog content",
  proceedButtonColor: "error",
  setShow: setShowMock,
  onConfirm: onConfirmMock,
};

describe("CustomDialog", async () => {
  const user = userEvent.setup();

  test("should correctly render CustomDialog", () => {
    renderWithProviders(<CustomDialog {...customDialogProps} />);
    const proceedButton = screen.getByRole("button", { name: "Proceed" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const dialogTitle = screen.getByText(customDialogProps.title);
    const dialogContent = screen.getByText(customDialogProps.content);

    expect(proceedButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
  });

  test("should call onConfirm function when button Proceed pressed", async () => {
    renderWithProviders(<CustomDialog {...customDialogProps} />);

    const proceedButton = screen.getByRole("button", { name: "Proceed" });
    await user.click(proceedButton);

    expect(onConfirmMock).toHaveBeenCalled();
  });

  test("should call setShow function when button Cancel pressed", async () => {
    renderWithProviders(<CustomDialog {...customDialogProps} />);

    const proceedButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(proceedButton);

    expect(setShowMock).toHaveBeenCalledWith(false);
  });
});
