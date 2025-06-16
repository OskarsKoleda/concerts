import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { useRootStore } from "../../store/StoreContext";

import { EventFilters } from "./eventFilters/eventFilters.tsx";
import { EventListSettings } from "./eventListSettings/eventListSettings.tsx";
import EventsList from "./EventsList/EventsList.tsx";
import { EventsTable } from "./eventsTable/eventsTable.tsx";

export const EventList: React.FC = observer(function EventList() {
  const {
    applicationStore: { tableViewIsSelected },
  } = useRootStore();

  return (
    <Box width="85%">
      <EventFilters />
      <EventListSettings />
      {tableViewIsSelected ? <EventsTable /> : <EventsList />}
    </Box>
  );
});
