import { render, screen } from "@testing-library/react";
import EventFooter from "./EventFooter";
import { ServerEventData } from "../../../../common/types/eventTypes";

const mockedEvent = {
  city: "New York",
  location: "Madison Square Garden",
  owner: {
    id: "2",
    name: "admin",
  },
} as ServerEventData;

describe("EventFooter", () => {
  it("renders event location and author when location is present", () => {
    render(<EventFooter event={mockedEvent} />);
    expect(screen.getByText("New York / Madison Square Garden")).toBeInTheDocument();
    expect(screen.getByText("added by admin")).toBeInTheDocument();
  });

  it("renders event location and author when location is missing", () => {
    const eventWithoutLocation = { ...mockedEvent, location: undefined };
    render(<EventFooter event={eventWithoutLocation} />);
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("added by admin")).toBeInTheDocument();
  });
});
