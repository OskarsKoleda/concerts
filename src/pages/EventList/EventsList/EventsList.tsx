import { Box, Grid, Typography } from "@mui/material";

import { useGetEvents } from "../../../api/useGetEvents.ts";
import ContentLoader from "../../../components/ContentLoader/ContentLoader.tsx";
import EventCard from "../../../components/EventCard/EventCard.tsx";

const EventsList = () => {
  const { events, isLoading } = useGetEvents();

  return (
    <ContentLoader isLoading={isLoading}>
      {events.length ? (
        <Grid container rowSpacing={2} columnSpacing={2}>
          {events.map((event) => (
            <Grid item key={event.slug} sm={12} md={6}>
              <EventCard event={event} />
            </Grid>
          ))}
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
