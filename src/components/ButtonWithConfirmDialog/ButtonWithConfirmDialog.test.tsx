import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ButtonWithConfirmDialog from "./ButtonWithConfirmDialog";

describe("ButtonWithConfirmDialog", () => {
  const defaultProps = {
    buttonTitle: "Delete",
    customDialogTitle: "Confirm Delete",
    dialogContent: "Are you sure?",
    onConfirm: vi.fn(),
    tooltip: "Delete item",
    id: "delete-btn",
    color: "error" as const,
    variant: "contained" as const,
    disabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the button with the correct title", () => {
    render(<ButtonWithConfirmDialog {...defaultProps} />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("shows the tooltip on hover", async () => {
    render(<ButtonWithConfirmDialog {...defaultProps} />);
    await userEvent.hover(screen.getByRole("button", { name: /delete/i }));
    expect(await screen.findByText(/delete item/i)).toBeInTheDocument();
  });

  it("opens the dialog when the button is clicked", async () => {
    render(<ButtonWithConfirmDialog {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.getByText(/confirm delete/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  it("calls onConfirm and closes dialog when confirm is clicked", async () => {
    render(<ButtonWithConfirmDialog {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    const confirmButton = screen.getByRole("button", { name: /proceed/i });
    await userEvent.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/confirm deletion/i)).not.toBeInTheDocument();
  });

  it("passes disabled prop to the button", () => {
    render(<ButtonWithConfirmDialog {...defaultProps} disabled />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeDisabled();
  });
});
