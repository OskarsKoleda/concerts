import { observer } from "mobx-react-lite";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import { ROUTE_LIST } from "../../router/routes.ts";
import { eventRowContainerStyles } from "./styles.ts";

type EventRowProps = {
  event: ServerEventDataWithId;
};

export const EventRow: React.FC<EventRowProps> = observer(function EventRow({
  event,
}: EventRowProps) {
  const { eventId, eventTitle, posterImageUrl } = event;
  const navigate = useNavigate();

  return (
    <Box
      sx={eventRowContainerStyles(posterImageUrl)}
      onClick={() => navigate(`${ROUTE_LIST.EVENTS}/${eventId}`)}
    >
      <Typography variant="h3">{eventTitle.toUpperCase()}</Typography>
    </Box>
  );
});
