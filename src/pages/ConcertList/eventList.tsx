import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { useRootStore } from "../../store/StoreContext";
import { ConcertListRequests } from "../../store/transport/eventListTransport/constants";

import { ConcertCardsList } from "./concertCardsList/concertCards";
import { EventFilters } from "./eventFilters/eventFilters.tsx";
import { EventsTable } from "./concertsTable/eventsTable.tsx";
import { contentContainer } from "./styles";

export const EventList: React.FC = observer(function EventList() {
  const {
    applicationStore: { listViewIsSelected },
    eventListStore: {
      getAllEvents,

      eventListTransport: {
        requestHandler: { resetRequest, isSuccessfulRequest },
      },
    },
  } = useRootStore();

  const concertsHaveLoaded: boolean = isSuccessfulRequest(ConcertListRequests.getConcertsData);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  useEffect(
    () => () => {
      resetRequest(ConcertListRequests.getConcertsData);
    },
    [],
  );

  // try <Suspense> instead of Content Loader
  return (
    <ContentLoader isLoading={!concertsHaveLoaded}>
      <Box sx={contentContainer}>
        <EventFilters />
        {listViewIsSelected ? <ConcertCardsList /> : <EventsTable />}
      </Box>
    </ContentLoader>
  );
});
