import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";

import React from "react";
import { useRootStore } from "../../../store/StoreContext";

import { EventCard } from "../../../components/EventCard/eventCard.tsx";

export const EventCardsList: React.FC = observer(function EventCardsList() {
  const {
    eventListStore: { events },
  } = useRootStore();

  return (
    <Box>
      <Grid container direction="row" justifyContent="flex-start" rowSpacing={2} columnSpacing={2}>
        {events.map((event) => (
          <Grid item key={event.eventId} sm={12} md={6}>
            <EventCard key={event.eventId} event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
