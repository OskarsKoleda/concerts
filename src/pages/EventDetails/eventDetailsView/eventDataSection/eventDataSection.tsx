import { Box, Divider, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../../../store/StoreContext.tsx";
import { ROUTE_LIST } from "../../../../router/routes.ts";
import { NavLinkButton } from "../../../../components/NavButton/navButton.tsx";

import {
  eventButtonContainerStyles,
  eventDataContainerStyles,
  eventDataFooterStyles,
  eventDataStyles,
} from "./styles.ts";

export const EventDataSection = observer(function EventDataSection() {
  const {
    eventDetailsUIStore: {
      currentEventId,
      currentEventCity,
      currentEventLocation,
      currentEventDate,
      currentFestivalEndDate,
      currentFestivalTicketPrice,
    },
  } = useRootStore();

  const formattedDate = currentFestivalEndDate
    ? `${currentEventDate} - ${currentFestivalEndDate}`
    : currentEventDate;

  return (
    <Paper sx={eventDataContainerStyles}>
      <Box sx={eventDataStyles}>
        <Typography variant="h4">{currentEventCity}</Typography>
        <Typography variant="h5">{currentEventLocation}</Typography>
        <Typography variant="subtitle1" mt="1.5rem">
          {formattedDate}
        </Typography>
      </Box>

      <Divider orientation="horizontal" flexItem />
      <Box sx={eventDataFooterStyles}>
        <Typography variant="h4">{currentFestivalTicketPrice}</Typography>
      </Box>
      <Box sx={eventButtonContainerStyles}>
        <NavLinkButton to={ROUTE_LIST.EVENTS}>Back</NavLinkButton>
        <NavLinkButton to={`${ROUTE_LIST.EVENTS}/${currentEventId}/edit`}>Edit</NavLinkButton>
      </Box>
    </Paper>
  );
});
