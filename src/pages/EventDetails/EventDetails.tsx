import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useGetEventDetails } from "../../api/events/useGetEventDetails.ts";
import posterMissing from "../../assets/poster-missing.jpg";

import ContentLoader from "../../components/ContentLoader/ContentLoader.tsx";
import { EventBandsSection } from "./EventBandsSection/EventBandsSection.tsx";
import EventDataSection from "./EventDataSection/EventDataSection.tsx";
import EventPoster from "./EventPoster/EventPoster.tsx";
import {
  eventContainerStyles,
  eventDetailsStyles,
  eventNotFoundStyles,
  eventTitleStyles,
} from "./styles.ts";

const EventDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { eventData, isLoading, isError } = useGetEventDetails(slug);
  const { url, title, bands } = eventData || {};

  // TODO: improve not found page
  // TODO: think of something for super big screens / small screens
  if (isError) {
    return (
      <Box sx={eventNotFoundStyles}>
        <Typography variant="h3">Event Not Found! (╯°□°）╯︵ ┻━┻</Typography>
        <Button size="large" variant="contained" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </Box>
    );
  }

  return (
    <ContentLoader isLoading={isLoading}>
      <Box sx={eventContainerStyles}>
        <Typography variant="h2" textAlign="center" sx={eventTitleStyles}>
          {title}
        </Typography>

        <Box sx={eventDetailsStyles}>
          <EventDataSection event={eventData} />
          <EventPoster
            posterURL={url || posterMissing}
            posterTitle={url ? title : "poster-is-missing"}
          />
          {bands?.length ? <EventBandsSection bands={bands} /> : null}
        </Box>
      </Box>
    </ContentLoader>
  );
};

export default EventDetails;
