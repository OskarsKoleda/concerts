import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";

import { eventAuthorStyles, footerStyles, venueIconStyles, venueStyles } from "../styles";

import type { ServerEventData } from "../../../../common/types/eventTypes";

interface EventFooterProps {
  event: ServerEventData;
}

const EventFooter = ({ event }: EventFooterProps) => {
  const { city, venue, owner } = event;

  const formattedEventVenue = useMemo(() => {
    return venue ? `${city} / ${venue}` : city;
  }, [city, venue]);

  return (
    <Box sx={footerStyles}>
      <Box sx={venueStyles}>
        <LocationOnIcon fontSize="small" sx={venueIconStyles} />
        <Typography variant="body2" color="text.secondary">
          {formattedEventVenue}
        </Typography>
      </Box>
      <Typography sx={eventAuthorStyles}>added by {owner.name}</Typography>
    </Box>
  );
};

export default EventFooter;
