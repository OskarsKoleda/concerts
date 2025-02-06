export enum EventsPageIds {
  eventTitleFilter = "eventTitleFilter",
  cityFilter = "cityFilter",
  bandFilter = "bandFilter",
  filterButton = "filterButton",
  resetButton = "resetButton",
  eventTypeToggle = "eventTypeToggle",
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
