import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SnackbarVariantType } from "../../common/enums/appEnums";
import { renderWithProviders } from "../../common/utils/testingUtils";
import RootStore from "../../store/RootStore";

import DeleteEventButton from "./DeleteEventButton";

const mockNavigate = vi.fn();
const mockShowSnackbar = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../hooks/useCustomSnackbar", () => ({
  default: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

describe.skip("DeleteEventButton", () => {
  const user = userEvent.setup();

  test("renders dialog when Delete button was pressed", async () => {
    renderWithProviders(<DeleteEventButton />);

    const deleteButton = screen.getByRole("button");

    await user.click(deleteButton);

    const proceedButton = screen.getByRole("button", { name: "Proceed" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const dialog = screen.getByRole("dialog", { name: "Are you sure?" });
    const content = screen.getByText("You are about to delete the event permanently. Proceed?");

    expect(cancelButton).toBeInTheDocument();
    expect(proceedButton).toBeInTheDocument();
    expect(dialog).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  test("calls `deleteEvent` when Proceed button was pressed", async () => {
    const mockDeleteEvent = vi.fn().mockResolvedValue("event-id");
    const mockEventId = "test-event-id";
    const rootStore = new RootStore();

    rootStore.eventDetailsUIStore.setEventId(mockEventId);
    rootStore.eventDetailsRequestStore.deleteEvent = mockDeleteEvent;

    renderWithProviders(<DeleteEventButton />, {
      rootStore,
    });

    const deleteButton = screen.getByRole("button");

    await user.click(deleteButton);

    const proceedButton = screen.getByRole("button", { name: "Proceed" });

    await user.click(proceedButton);

    expect(mockDeleteEvent).toHaveBeenCalledWith(mockEventId);
    expect(mockNavigate).toHaveBeenCalledWith("/events");
    expect(mockShowSnackbar).toHaveBeenCalledWith({
      message: "event-id was successfully deleted",
      variant: SnackbarVariantType.SUCCESS,
    });
  });
});
