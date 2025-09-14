import { Box, Grid, Typography } from "@mui/material";

import { useGetEvents } from "../../../api/useGetEvents.ts";
import ContentLoader from "../../../components/ContentLoader/ContentLoader.tsx";
import EventCard from "../EventCard/EventCard.tsx";

import type { ServerEventData } from "../../../common/types/eventTypes.ts";

const EventsList = () => {
  const { events, isLoading } = useGetEvents();

  const renderCard = (event: ServerEventData) => {
    const { slug } = event;

    return (
      <Grid item key={slug} sm={12} md={6}>
        <EventCard event={event} />
      </Grid>
    );
  };

  return (
    <ContentLoader isLoading={isLoading}>
      {events.length ? (
        <Grid container rowSpacing={2} columnSpacing={2}>
          {events.map(renderCard)}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="h2">Nothing Found</Typography>
        </Box>
      )}
    </ContentLoader>
  );
};

export default EventsList;
