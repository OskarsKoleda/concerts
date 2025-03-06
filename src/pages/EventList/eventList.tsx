import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/StoreContext";
import { EventCardsList } from "./eventCardsList/eventCards.tsx";
import { EventFilters } from "./eventFilters/eventFilters.tsx";
import { EventsTable } from "./eventsTable/eventsTable.tsx";

export const EventList: React.FC = observer(function EventList() {
  const {
    applicationStore: { listViewIsSelected },
  } = useRootStore();

  return (
    <Box width="85%">
      <EventFilters />
      {listViewIsSelected ? <EventCardsList /> : <EventsTable />}
    </Box>
  );
});
