import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { useRootStore } from "../../store/StoreContext";

import { EventCardsList } from "./eventCardsList/eventCards.tsx";
import { EventFilters } from "./eventFilters/eventFilters.tsx";
import { EventsTable } from "./eventsTable/eventsTable.tsx";
import { contentContainer } from "./styles";

import { EventListRequests } from "../../store/transport/eventListTransport/constants.ts";

export const EventList: React.FC = observer(function EventList() {
  const {
    applicationStore: { listViewIsSelected },
    eventListStore: {
      getAllEvents,
      setupEventsListener,
      cleanupListener,

      eventListTransport: {
        requestHandler: { resetRequest, isSuccessfulRequest },
      },
    },
  } = useRootStore();

  const concertsHaveLoaded: boolean = isSuccessfulRequest(EventListRequests.getEventsData);

  useEffect(() => {
    getAllEvents();
    setupEventsListener();

    return () => {
      cleanupListener();
      resetRequest(EventListRequests.getEventsData);
    };
  }, [getAllEvents, setupEventsListener]);

  // TODO: try <Suspense> instead of Content Loader
  return (
    <ContentLoader isLoading={!concertsHaveLoaded}>
      <Box sx={contentContainer}>
        <EventFilters />
        {listViewIsSelected ? <EventCardsList /> : <EventsTable />}
      </Box>
    </ContentLoader>
  );
});
