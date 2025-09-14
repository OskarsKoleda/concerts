export enum EventsPageId {
  EventTitleFilter = "eventTitleFilter",
  CityFilter = "cityFilter",
  BandFilter = "bandFilter",
  FilterButton = "filterButton",
  ResetButton = "resetButton",
  EventTypeToggle = "eventTypeToggle",
}

export const eventsPageText = {
  ENGLISH: {
    filters: {
      inputs: {
        eventTitle: {
          label: "Event Title",
          placeholder: "Enter event title",
        },
        band: {
          label: "Band",
          placeholder: "Enter band",
        },
        city: {
          label: "City",
          placeholder: "Enter city",
        },
      },
      buttons: {
        reset: { label: "Reset" },
      },
    },
  },
};
