import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";

import { eventAuthorStyles, footerStyles, locationIconStyles, locationStyles } from "../styles";

import type { ServerEventData } from "../../../../common/types/eventTypes";

interface EventFooterProps {
  event: ServerEventData;
}

const EventFooter = ({ event }: EventFooterProps) => {
  const { city, location, owner } = event;

  const formattedEventLocation = useMemo(() => {
    return location ? `${city} / ${location}` : city;
  }, [city, location]);

  return (
    <Box sx={footerStyles}>
      <Box sx={locationStyles}>
        <LocationOnIcon fontSize="small" sx={locationIconStyles} />
        <Typography variant="body2" color="text.secondary">
          {formattedEventLocation}
        </Typography>
      </Box>
      <Typography sx={eventAuthorStyles}>added by {owner.name}</Typography>
    </Box>
  );
};

export default EventFooter;
