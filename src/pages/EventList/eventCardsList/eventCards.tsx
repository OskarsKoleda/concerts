import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";

import React, { useEffect } from "react";
import { useRootStore } from "../../../store/StoreContext";

import { EventCard } from "../../../components/EventCard/eventCard.tsx";
import { EventListRequests } from "../../../store/transport/eventListTransport/constants.ts";
import { ContentLoader } from "../../../components/ContentLoader/contentLoader.tsx";

export const EventCardsList: React.FC = observer(function EventCardsList() {
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
  } = useRootStore();

  // TODO: try suspense?
  const concertsHaveLoaded: boolean = isSuccessfulRequest(EventListRequests.getEventsData);

  useEffect(() => {
    getAllEvents();
    setupEventsListener();

    return () => {
      cleanupListener();
      resetRequest(EventListRequests.getEventsData);
    };
  }, [getAllEvents, setupEventsListener]);

  return (
    <ContentLoader isLoading={!concertsHaveLoaded}>
      <Grid container direction="row" rowSpacing={2} columnSpacing={2}>
        {events.map((event) => (
          <Grid item key={event.eventId} sm={12} md={6}>
            <EventCard key={event.eventId} event={event} />
          </Grid>
        ))}
      </Grid>
    </ContentLoader>
  );
});
