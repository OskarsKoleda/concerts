import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EventCategory } from "../../../common/enums/appEnums";
import { renderWithProviders } from "../../../common/utils/testingUtils";
import { ROUTES } from "../../../router/routes";
import posterMissing from "../../../assets/poster-missing.jpg";

import EventCard from "./EventCard";

import type { ServerEventData } from "../../../common/types/eventTypes";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const mockEvent: ServerEventData = {
  title: "Rock Concert",
  date: "2024-12-30T19:00:00Z",
  bands: ["Band A", "Band B"],
  city: "New York",
  location: "Madison Square Garden",
  url: "https://example.com/image.jpg",
  slug: "rock-concert-2024",
  category: EventCategory.MusicConcert,
  owner: {
    id: "2",
    name: "admin",
  },
  isVisited: false,
};

vi.mock("./EventHeader/EventHeader", () => ({
  default: () => <div data-testid="event-header">Mock Header</div>,
}));

vi.mock("./EventBands/EventBands", () => ({
  default: () => <div data-testid="event-bands">Mock Bands</div>,
}));

vi.mock("./EventFooter/EventFooter", () => ({
  default: () => <div data-testid="event-footer">Mock Footer</div>,
}));

describe("EventCard", () => {
  it("calls navigate with correct route when action button is clicked", async () => {
    renderWithProviders(<EventCard event={mockEvent} />);
    const viewEventButton = screen.getByRole("button", { name: /view/i });
    fireEvent.click(viewEventButton);
    expect(navigateMock).toHaveBeenCalledWith(`${ROUTES.EVENTS}/${mockEvent.slug}`);
  });

  it("renders image with correct src and alt when event has poster", () => {
    renderWithProviders(<EventCard event={mockEvent} />);
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", mockEvent.url);
    expect(img).toHaveAttribute("alt", mockEvent.title);
  });

  it("renders image with correct src and alt when event has no poster", () => {
    const { url, ...mockEventWithoutPoster } = mockEvent;
    renderWithProviders(<EventCard event={mockEventWithoutPoster} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", posterMissing);
    expect(img).toHaveAttribute("alt", "poster-is-missing");
  });

  it("renders card with all components", () => {
    renderWithProviders(<EventCard event={mockEvent} />);
    expect(screen.getByRole("button", { name: /view/i })).toBeInTheDocument();
    expect(screen.getByTestId("event-header")).toBeInTheDocument();
    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByTestId("event-bands")).toBeInTheDocument();
    expect(screen.getByText("Mock Bands")).toBeInTheDocument();
    expect(screen.getByTestId("event-footer")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });
});
