import { Box, Divider, Paper, Typography } from "@mui/material";

import NavLinkButton from "../../../../components/NavLinkButton/NavLinkButton.tsx";
import { ROUTES } from "../../../../router/routes.ts";

import {
  eventButtonContainerStyles,
  eventDataContainerStyles,
  eventDataFooterStyles,
  eventDataStyles,
} from "./styles.ts";

import type { ServerEventData } from "../../../../common/types/eventTypes.ts";

interface EventDataSectionProps {
  event: ServerEventData | undefined;
}

export const EventDataSection = ({ event }: EventDataSectionProps) => {
  const { slug, city, location, date, endDate, ticketPrice } = event || {};

  const formattedDate = endDate ? `${date} - ${endDate}` : date;

  return (
    <Paper sx={eventDataContainerStyles}>
      <Box sx={eventDataStyles}>
        <Typography variant="h4">{city}</Typography>
        <Typography variant="h5">{location}</Typography>
        <Typography variant="subtitle1" mt="1.5rem">
          {formattedDate}
        </Typography>
      </Box>

      <Divider orientation="horizontal" flexItem />
      <Box sx={eventDataFooterStyles}>
        <Typography variant="h4">{ticketPrice} €</Typography>
      </Box>
      <Box sx={eventButtonContainerStyles}>
        <NavLinkButton to={ROUTES.EVENTS}>Back</NavLinkButton>
        <NavLinkButton to={`${ROUTES.EVENTS}/${slug}/edit`}>Edit</NavLinkButton>
      </Box>
    </Paper>
  );
};

export default EventDataSection;
