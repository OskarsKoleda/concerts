import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useGetEventDetails } from "../../api/useGetEventDetails.ts";
import ContentLoader from "../../components/ContentLoader/ContentLoader.tsx";

import { EventBandsSection } from "./EventBandsSection/EventBandsSection.tsx";
import EventDataSection from "./EventDataSection/EventDataSection.tsx";
import EventPoster from "./EventPoster/EventPoster.tsx";
import { eventContainerStyles, eventHeaderStyles, eventNotFoundStyles } from "./styles.ts";

const EventDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { eventData, isLoading, isError } = useGetEventDetails(slug);
  const { url, title, bands } = eventData || {};

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
        <Box sx={eventHeaderStyles}>
          <Typography variant="h2">{title}</Typography>
        </Box>

        <Box display="flex" justifyContent="center">
          <EventDataSection event={eventData} />
          <EventPoster posterURL={url} posterTitle={title} />
          {bands?.length ? <EventBandsSection bands={bands} /> : null}
        </Box>
      </Box>
    </ContentLoader>
  );
};

export default EventDetails;
