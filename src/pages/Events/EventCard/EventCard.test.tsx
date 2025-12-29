import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EventCategory } from "../../../common/enums/appEnums";
import { renderWithProviders } from "../../../common/utils/testingUtils";
import { ROUTES } from "../../../router/routes";

import EventCard from "./EventCard";

import type { ServerEventData } from "../../../common/types/eventTypes";
import { formatEventDate } from "../../../common/utils/utils";

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
};

describe("EventCard", () => {
  it("renders event title, date, bands, and location", () => {
    renderWithProviders(<EventCard event={mockEvent} />);
    expect(screen.getByText("Rock Concert")).toBeInTheDocument();
    expect(screen.getByText("30.12.2024")).toBeInTheDocument();
    expect(screen.getByText("Band A")).toBeInTheDocument();
    expect(screen.getByText("Band B")).toBeInTheDocument();
    expect(screen.getByText("New York / Madison Square Garden")).toBeInTheDocument();
  });

  it("renders only city if location is missing", () => {
    const eventWithoutLocation = { ...mockEvent, location: "" };

    renderWithProviders(<EventCard event={eventWithoutLocation} />);
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it("calls navigate with correct route when action button is clicked", async () => {
    renderWithProviders(<EventCard event={mockEvent} />);

    const button = screen.getByRole("button", { name: /view/i });

    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith(`${ROUTES.EVENTS}/${mockEvent.slug}`);
  });

  it("renders image with correct src and alt", () => {
    renderWithProviders(<EventCard event={mockEvent} />);
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", mockEvent.url);
    expect(img).toHaveAttribute("alt", mockEvent.title);
  });
});

describe("formatEventDate", () => {
  it("formats event date correctly when both dates are provided", () => {
    const result = formatEventDate("2024-12-30T00:00:00Z", "2025-01-02T00:00:00Z");

    expect(result).toBe("30.12.2024 - 02.01.2025");
  });

  it("formats event date correctly when only event date is provided", () => {
    const result = formatEventDate("2024-12-30T19:00:00Z");
    expect(result).toBe("30.12.2024");
  });
});
