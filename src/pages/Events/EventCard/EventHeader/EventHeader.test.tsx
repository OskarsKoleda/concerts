import { fireEvent, screen } from "@testing-library/react";
import EventHeader from "./EventHeader";
import { ServerEventData } from "../../../../common/types/eventTypes";
import { renderWithProviders } from "../../../../common/utils/testingUtils";
import { formatEventDate } from "../../../../common/utils/utils";
import RootStore from "../../../../store/RootStore";

const mockedEvent = {
  title: "Event Title",
  date: "25-11-2025",
  endDate: "24-12-2026",
  slug: "event-slug",
  isVisited: false,
} as ServerEventData;

const mockedMutation = vi.fn();

vi.mock("../../../../common/utils/utils", () => ({
  formatEventDate: vi.fn(),
}));

vi.mock("../../../../api/events/useVisitEvent", () => ({
  useVisitEvent: vi.fn(() => ({
    mutate: mockedMutation,
  })),
}));

describe("EventHeader", () => {
  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();
    rootStore.userStore.setUserProfile({
      id: "1",
      name: "test",
      email: "test",
      age: 25,
    });
  });

  it("renders correctly for authenticated user", () => {
    const mockedFormattedDate = "01-01-2026";

    vi.mocked(formatEventDate).mockReturnValue(mockedFormattedDate);

    renderWithProviders(<EventHeader event={mockedEvent} />, { rootStore });

    expect(screen.getByText("Event Title")).toBeInTheDocument();
    expect(screen.getByText(mockedFormattedDate)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /I was there/i })).toBeInTheDocument();

    expect(formatEventDate).toHaveBeenCalledWith(mockedEvent.date, mockedEvent.endDate);
  });

  it("renders correctly for unauthenticated user", () => {
    rootStore.userStore.setUserProfile(null);
    renderWithProviders(<EventHeader event={mockedEvent} />, { rootStore });

    expect(screen.getByText("Event Title")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders 'Visit' button correctly for not visited event", () => {
    const { container } = renderWithProviders(<EventHeader event={mockedEvent} />, { rootStore });

    expect(container).toMatchSnapshot();
  });

  it("renders 'Unvisit' button correctly for visited event", () => {
    const { container } = renderWithProviders(
      <EventHeader event={{ ...mockedEvent, isVisited: true }} />,
      { rootStore },
    );

    expect(container).toMatchSnapshot();
  });

  it("calls visit event mutation when 'Visit' button is clicked", () => {
    renderWithProviders(<EventHeader event={mockedEvent} />, { rootStore });

    const visitButton = screen.getByRole("button");
    fireEvent.click(visitButton);

    expect(mockedMutation).toHaveBeenCalledWith(mockedEvent.slug);
  });
});
