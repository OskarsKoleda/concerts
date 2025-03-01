import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLoader } from "../../../components/ContentLoader/contentLoader.tsx";
import { useRootStore } from "../../../store/StoreContext.tsx";
import { ROUTE_LIST } from "../../../router/routes.ts";
import { eventContainerStyles, eventHeaderStyles } from "./styles.ts";
import { EventDataSection } from "./eventDataSection/eventDataSection.tsx";
import { EventArtistsSection } from "./eventArtistsSection/eventArtistsSection.tsx";
import { EventPoster } from "./eventPoster/eventPoster.tsx";

export const EventDetailsView = observer(function EventDetailsView() {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const {
    eventDetailsRequestStore: { getEvent },
    eventDetailsUIStore: { currentEvent, currentEventTitle },
  } = useRootStore();

  const { isLoading, error } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId || ""),
  });

  // TODO: handling is not complete
  if (error) {
    navigate(`/${ROUTE_LIST.EVENTS}`);
  }

  return (
    <ContentLoader isLoading={isLoading || !currentEvent}>
      <Box sx={eventContainerStyles}>
        <Box sx={eventHeaderStyles}>
          <Typography variant="h2" fontFamily="cursive">
            {currentEventTitle}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center">
          <EventDataSection />
          <EventPoster />
          <EventArtistsSection />
        </Box>
      </Box>
    </ContentLoader>
  );
});
