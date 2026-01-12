import { screen } from "@testing-library/react";

import { EventCategory } from "../../../common/enums/appEnums";
import { renderWithProviders } from "../../../common/utils/testingUtils";

import EventsList from "./EventsList";

import type { ServerEventData } from "../../../common/types/eventTypes";

const mockEvents: ServerEventData[] = [
  {
    title: "Metallica World Tour 2025",
    category: EventCategory.MusicConcert,
    bands: ["Metallica", "Gojira"],
    city: "New York",
    date: "2025-10-15",
    venue: "Madison Square Garden",
    ticketPrice: 89.99,
    slug: "metallica-world-tour-2025",
    url: "https://example.com/events/metallica-world-tour-2025",
    owner: {
      id: "1",
      name: "admin",
    },
    isVisited: false,
  },
  {
    title: "Jazz Night Festival",
    category: EventCategory.MusicFestival,
    bands: ["John Coltrane Quartet", "Miles Davis Tribute Band"],
    city: "Chicago",
    date: "2025-11-20",
    endDate: "2025-11-21",
    venue: "Chicago Jazz Club",
    ticketPrice: 45.0,
    slug: "jazz-night-festival-2025",
    url: "https://example.com/events/jazz-night-festival-2025",
    owner: {
      id: "2",
      name: "admin",
    },
    isVisited: false,
  },
];

describe("EventList", () => {
  it("renders correctly", () => {
    renderWithProviders(<EventsList events={mockEvents} />);

    expect(screen.getByText("Metallica World Tour 2025")).toBeInTheDocument();
    expect(screen.getByText("Jazz Night Festival")).toBeInTheDocument();
  });

  it("renders correctly when no events provided", () => {
    renderWithProviders(<EventsList events={[]} />);

    expect(screen.getByText("Nothing Found")).toBeInTheDocument();
  });
});
