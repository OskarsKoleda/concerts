import { Box, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import type { ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import { ROUTE_LIST } from "../../router/routes.ts";

import { formatDate } from "../../common/utils/utility.ts";
import {
  cardContentChipStyles,
  cardContentFooterStyles,
  cardContentHeaderStyles,
  cardContentStyles,
  cardImageStyles,
  cardStyles,
  chipStyles,
} from "./styles.tsx";

type EventCardProps = {
  event: ServerEventDataWithId;
};

export const EventCard: React.FC<EventCardProps> = ({ event }: EventCardProps) => {
  const {
    posterImageUrl,
    eventId,
    eventTitle,
    artists,
    city,
    location,
    eventDate,
    festivalStartDate,
    festivalEndDate,
  } = event;

  const navigate = useNavigate();

  const handleOpenEvent = (eventId: string) => {
    navigate(`${ROUTE_LIST.EVENTS}/${eventId}`);
  };

  const formattedEventDate = useMemo(() => {
    if (eventDate) {
      return formatDate(eventDate);
    }

    if (festivalStartDate && festivalEndDate) {
      return `${formatDate(festivalStartDate)} - ${formatDate(festivalEndDate)}`;
    }
  }, [eventDate, festivalStartDate, festivalEndDate]);

  const eventLocation = useMemo(
    () => (location ? `${city} / ${location}` : city),
    [city, location],
  );

  return (
    <Card sx={cardStyles}>
      <CardMedia sx={cardImageStyles} component="img" image={posterImageUrl} />
      <CardContent sx={cardContentStyles}>
        <Box sx={cardContentHeaderStyles}>
          <Typography variant="h5">{eventTitle}</Typography>
          <Typography variant="subtitle2" mb={0.5}>
            {formattedEventDate}
          </Typography>
        </Box>

        {artists && (
          <Box sx={cardContentChipStyles}>
            {artists.map((artist) => (
              <Chip key={artist} size="small" sx={chipStyles} label={artist} />
            ))}
          </Box>
        )}

        <Box sx={cardContentFooterStyles}>
          <Box display="flex" alignItems="center">
            <LocationOnIcon fontSize="small" />
            <Typography variant="subtitle1">{eventLocation}</Typography>
          </Box>
          <CardActions>
            <Button variant="contained" onClick={() => handleOpenEvent(eventId)}>
              View
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};
