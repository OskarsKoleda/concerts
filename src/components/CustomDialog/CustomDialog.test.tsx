import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../common/utils/testingUtils";

import CustomDialog from "./CustomDialog";

const setShowMock = vi.fn();
const onConfirmMock = vi.fn();

const customDialogProps = {
  show: true,
  title: "My Dialog",
  content: "My dialog content",
  proceedButtonColor: "error" as const,
  setShow: setShowMock,
  onConfirm: onConfirmMock,
};

describe("CustomDialog", async () => {
  const user = userEvent.setup();

  it("should correctly render CustomDialog", () => {
    renderWithProviders(<CustomDialog {...customDialogProps} />);
    const proceedButton = screen.getByRole("button", { name: /proceed/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const dialogTitle = screen.getByText(customDialogProps.title);
    const dialogContent = screen.getByText(customDialogProps.content);

    expect(proceedButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
  });

  it("should not render dialog when show is false", () => {
    renderWithProviders(<CustomDialog {...customDialogProps} show={false} />);

    expect(screen.queryByText(customDialogProps.title)).not.toBeInTheDocument();
    expect(screen.queryByText(customDialogProps.content)).not.toBeInTheDocument();
  });

  it("should call onConfirm function when button Proceed pressed", async () => {
    renderWithProviders(<CustomDialog {...customDialogProps} />);

    const proceedButton = screen.getByRole("button", { name: /proceed/i });
    await user.click(proceedButton);

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it("should call setShow function when button Cancel pressed", async () => {
    renderWithProviders(<CustomDialog {...customDialogProps} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(setShowMock).toHaveBeenCalledWith(false);
  });
});
