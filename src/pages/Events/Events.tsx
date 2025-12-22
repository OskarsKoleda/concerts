import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import { useGetEvents } from "../../api/events/useGetEvents.ts";
import ContentLoader from "../../components/ContentLoader/ContentLoader.tsx";
import { useRootStore } from "../../store/StoreContext.tsx";

import { EventFilters } from "./EventFilters/EventFilters.tsx";
import EventsList from "./EventsList/EventsList.tsx";
import EventsSettings from "./EventsSettings/EventsSettings.tsx";
import EventsTable from "./eventsTable/eventsTable.tsx";
import { eventListStyles, eventsLayoutStyles } from "./styles.ts";

const Events = () => {
  const { isTableView: isTableViewSelected } = useRootStore().applicationStore;

  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

  const { events, isLoading } = useGetEvents(filters);

  return (
    <Box sx={eventsLayoutStyles}>
      <EventFilters />
      <EventsSettings />

      <Box sx={eventListStyles}>
        <ContentLoader isLoading={isLoading}>
          {isTableViewSelected ? <EventsTable events={events} /> : <EventsList events={events} />}
        </ContentLoader>
      </Box>
    </Box>
  );
};

export default observer(Events);
