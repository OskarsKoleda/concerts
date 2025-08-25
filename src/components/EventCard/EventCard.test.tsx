import { screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";

import { EventCategory } from "../../common/enums/appEnums";
import { renderWithProviders } from "../../common/utils/testingUtils";
import * as utilsModule from "../../common/utils/utils";

import type { ServerEventData } from "../../common/types/eventTypes";
import EventCard from "./EventCard";
import { formatEventDate } from "./utils";

const mockedEvent: ServerEventData = {
  title: "Event Title",
  slug: "event-title",
  category: EventCategory.musicConcert,
  url: "https://example.com/image.jpg",
  bands: ["Artist 1", "Artist 2"],
  city: "City Name",
  location: "Venue Name",
  date: "2024-06-01",
  endDate: "2024-06-03",
};

describe("EventCard", () => {
  test("all Event Card parts are rendered", () => {
    renderWithProviders(<EventCard event={mockedEvent} />);

    const posterImage = screen.getByRole("img");
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute("src", mockedEvent.url);

    const eventTitle = screen.getByText(mockedEvent.title);
    expect(eventTitle).toBeInTheDocument();

    const eventDate = screen.getByText("01.06.2024 - 03.06.2024");
    expect(eventDate).toBeInTheDocument();

    const firstArtist = screen.getByText("Artist 1");
    expect(firstArtist).toBeInTheDocument();

    const secondArtist = screen.getByText("Artist 2");
    expect(secondArtist).toBeInTheDocument();

    const cityLocation = screen.getByText("City Name / Venue Name");
    expect(cityLocation).toBeInTheDocument();
  });
});

describe("formatEventDate", () => {
  const mockFormatDateToDefault = vi.spyOn(utilsModule, "formatDateToDefault");

  beforeEach(() => {
    mockFormatDateToDefault.mockClear();
  });

  test("returns formatted range when both eventDate and festivalEndDate are provided", () => {
    mockFormatDateToDefault
      .mockImplementationOnce((date) => `formatted-${date}`)
      .mockImplementationOnce((date) => `formatted-${date}`);

    const result = formatEventDate("2024-06-01", "2024-06-03");
    expect(result).toBe("formatted-2024-06-01 - formatted-2024-06-03");
    expect(mockFormatDateToDefault).toHaveBeenCalledTimes(2);
    expect(mockFormatDateToDefault).toHaveBeenCalledWith("2024-06-01");
    expect(mockFormatDateToDefault).toHaveBeenCalledWith("2024-06-03");
  });

  test("returns formatted eventDate when only eventDate is provided", () => {
    mockFormatDateToDefault.mockImplementation((date) => `formatted-${date}`);

    const result = formatEventDate("2024-06-01");
    expect(result).toBe("formatted-2024-06-01");
    expect(mockFormatDateToDefault).toHaveBeenCalledTimes(1);
    expect(mockFormatDateToDefault).toHaveBeenCalledWith("2024-06-01");
  });

  test("returns empty string when neither eventDate nor festivalEndDate is provided", () => {
    const result = formatEventDate();
    expect(result).toBe("");
    expect(mockFormatDateToDefault).not.toHaveBeenCalled();
  });

  test("returns empty string when eventDate is undefined but festivalEndDate is provided", () => {
    const result = formatEventDate(undefined, "2024-06-03");
    expect(result).toBe("");
    expect(mockFormatDateToDefault).not.toHaveBeenCalled();
  });
});
