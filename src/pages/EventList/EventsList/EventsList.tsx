import { Box, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";

import ContentLoader from "../../../components/ContentLoader/ContentLoader.tsx";
import EventCard from "../../../components/EventCard/EventCard.tsx";
import { EventRow } from "../../../components/EventRow/eventRow.tsx";
import { useRootStore } from "../../../store/StoreContext.tsx";
import { EventListRequests } from "../../../store/transport/eventListTransport/constants.ts";

const EventsList = () => {
  const {
    eventListStore: {
      events,
      getAllEvents,
      setupEventsListener,
      cleanupListener,
      eventListTransport: {
        requestHandler: { resetRequest, isSuccessfulRequest },
      },
    },
    applicationStore: { smallCardsViewIsSelected },
  } = useRootStore();

  // TODO: try suspense?
  const concertsHaveLoaded: boolean = isSuccessfulRequest(EventListRequests.getEventsData);

  // TODO: something to clean up here
  const eventsCardList = useMemo(() => {
    return smallCardsViewIsSelected ? (
      <Grid container rowSpacing={2}>
        {events.map((event) => (
          <Grid item key={event.eventId} sm={12}>
            <EventRow key={event.eventId} event={event} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Grid container rowSpacing={2} columnSpacing={2}>
        {events.map((event) => (
          <Grid item key={event.eventId} sm={12} md={6}>
            <EventCard key={event.eventId} event={event} />
          </Grid>
        ))}
      </Grid>
    );
  }, [smallCardsViewIsSelected, events]);

  useEffect(() => {
    getAllEvents();
    setupEventsListener();

    return () => {
      cleanupListener();
      resetRequest(EventListRequests.getEventsData);
    };
  }, [getAllEvents, setupEventsListener, cleanupListener, resetRequest]);

  return (
    <ContentLoader isLoading={!concertsHaveLoaded}>
      {events.length ? (
        eventsCardList
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="h2">Nothing Found</Typography>
        </Box>
      )}
    </ContentLoader>
  );
};

export default observer(EventsList);
