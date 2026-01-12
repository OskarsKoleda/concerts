import { render, screen } from "@testing-library/react";

import EventFooter from "./EventFooter";

import type { ServerEventData } from "../../../../common/types/eventTypes";

const mockedEvent = {
  city: "New York",
  venue: "Madison Square Garden",
  owner: {
    id: "2",
    name: "admin",
  },
} as ServerEventData;

describe("EventFooter", () => {
  it("renders event venue and author when venue is present", () => {
    render(<EventFooter event={mockedEvent} />);
    expect(screen.getByText("New York / Madison Square Garden")).toBeInTheDocument();
    expect(screen.getByText("added by admin")).toBeInTheDocument();
  });

  it("renders event city and author when venue is missing", () => {
    const eventWithoutVenue = { ...mockedEvent, venue: undefined };
    render(<EventFooter event={eventWithoutVenue} />);
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("added by admin")).toBeInTheDocument();
  });
});
