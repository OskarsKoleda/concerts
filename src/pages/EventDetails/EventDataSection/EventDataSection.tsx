import { Box, Divider, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

import { formatEventDate } from "../../../common/utils/utils.ts";
import NavLinkButton from "../../../components/NavLinkButton/NavLinkButton.tsx";
import { ROUTES } from "../../../router/routes.ts";
import { useRootStore } from "../../../store/StoreContext.tsx";

import {
  eventButtonContainerStyles,
  eventDataContainerStyles,
  eventDataFooterStyles,
  eventDataStyles,
} from "./styles.ts";

import type { ServerEventData } from "../../../common/types/eventTypes.ts";

interface EventDataSectionProps {
  event?: ServerEventData;
}

export const EventDataSection = ({ event }: EventDataSectionProps) => {
  const { slug, city, venue, date, endDate, ticketPrice, owner } = event || {};
  const { userProfile } = useRootStore().userStore;

  const isEventOwner = owner?.name === userProfile?.name;

  return (
    <Paper sx={eventDataContainerStyles}>
      <Box sx={eventDataStyles}>
        <Typography variant="h4">{city}</Typography>
        <Typography variant="h5" whiteSpace="nowrap">
          {venue}
        </Typography>
        <Typography variant="subtitle1" whiteSpace="nowrap">
          {formatEventDate(date, endDate)}
        </Typography>
      </Box>

      <Divider orientation="horizontal" flexItem />
      <Box sx={eventDataFooterStyles}>
        <Typography variant="h4">{ticketPrice} €</Typography>
      </Box>
      <Box sx={eventButtonContainerStyles}>
        <NavLinkButton to={ROUTES.EVENTS}>Back</NavLinkButton>
        {isEventOwner && <NavLinkButton to={`${ROUTES.EVENTS}/${slug}/edit`}>Edit</NavLinkButton>}
      </Box>
    </Paper>
  );
};

export default observer(EventDataSection);
