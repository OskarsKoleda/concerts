import { Box, Grid, Typography } from "@mui/material";

import EventCard from "../EventCard/EventCard.tsx";

import { nothingFoundStyles } from "./styles.ts";

import type { ServerEventData } from "../../../common/types/eventTypes.ts";

interface EventsListProps {
  events: ServerEventData[];
}

const EventsList = ({ events }: EventsListProps) => {
  const renderEventCard = (event: ServerEventData) => {
    return (
      <Grid item key={event.slug} sm={12} md={6}>
        <EventCard event={event} />
      </Grid>
    );
  };

  return (
    <>
      {events.length ? (
        <Grid container rowSpacing={2} columnSpacing={2}>
          {events.map(renderEventCard)}
        </Grid>
      ) : (
        <Box sx={nothingFoundStyles}>
          <Typography variant="h2">Nothing Found</Typography>
        </Box>
      )}
    </>
  );
};

export default EventsList;
