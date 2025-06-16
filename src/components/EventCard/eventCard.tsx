import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import type { ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import { formatDate } from "../../common/utils/utility.ts";
import { ROUTE_LIST } from "../../router/routes.ts";

import EventImage from "./EventImage/EventImage.tsx";
import {
  cardContentChipStyles,
  cardContentFooterStyles,
  cardContentHeaderStyles,
  cardContentStyles,
  chipStyles,
  eventCardStyles,
} from "./styles.ts";

type EventCardProps = {
  event: ServerEventDataWithId;
};

const EventCard = ({ event }: EventCardProps) => {
  const {
    posterImageUrl,
    eventId,
    eventTitle,
    artists = [],
    city,
    location,
    eventDate,
    festivalEndDate,
  } = event;

  const navigate = useNavigate();

  const handleOpenEvent = useCallback(() => {
    navigate(`${ROUTE_LIST.EVENTS}/${eventId}`);
  }, [navigate, eventId]);

  const formattedEventDate = useMemo(() => {
    if (eventDate && festivalEndDate) {
      return `${formatDate(eventDate)} - ${formatDate(festivalEndDate)}`;
    }

    if (eventDate) {
      return formatDate(eventDate);
    }

    return "";
  }, [eventDate, festivalEndDate]);

  const eventLocation = useMemo(
    () => (location ? `${city} / ${location}` : city),
    [city, location],
  );

  return (
    <Card sx={eventCardStyles}>
      <EventImage eventTitle={eventTitle} posterImageUrl={posterImageUrl} />
      <CardContent sx={cardContentStyles}>
        <Box sx={cardContentHeaderStyles}>
          <Typography variant="h5">{eventTitle}</Typography>
          <Typography variant="subtitle2" mb={0.5}>
            {formattedEventDate}
          </Typography>
        </Box>

        {artists.length > 0 && (
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
            <Button variant="contained" onClick={handleOpenEvent}>
              View
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
