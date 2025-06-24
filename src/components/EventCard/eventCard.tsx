import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Button,
  CardActions,
  CardContent as CardContentMui,
  CardHeader as CardHeaderMui,
  Card as CardMui,
  Chip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { emptyPaddingStyles, horizontalCenteredStyles } from "../../common/styles.ts";
import type { ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import { ROUTE_LIST } from "../../router/routes.ts";

import CardImage from "./CardImage/CardImage.tsx";
import { cardActionsStyles, cardRightSideStyles, cardStyles, chipStyles } from "./styles.ts";
import { formatEventDate } from "./utils.ts";

interface EventCardProps {
  event: ServerEventDataWithId;
}

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
  const handleOpenEvent = useCallback(
    () => navigate(`${ROUTE_LIST.EVENTS}/${eventId}`),
    [navigate, eventId],
  );

  const formattedEventLocation = location ? `${city} / ${location}` : city;
  const formattedEventDate = formatEventDate(eventDate, festivalEndDate);

  return (
    <CardMui sx={cardStyles}>
      <CardImage imageTitle={eventTitle} imageUrl={posterImageUrl} />
      <Box sx={cardRightSideStyles}>
        <CardHeaderMui sx={emptyPaddingStyles} title={eventTitle} subheader={formattedEventDate} />

        {artists.length > 0 && (
          <CardContentMui sx={emptyPaddingStyles}>
            {artists.map((artist, index) => (
              <Chip key={artist + index} label={artist} size="small" sx={chipStyles} />
            ))}
          </CardContentMui>
        )}

        <CardActions sx={cardActionsStyles}>
          <Box sx={horizontalCenteredStyles}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="subtitle1">{formattedEventLocation}</Typography>
          </Box>
          <Button variant="contained" onClick={handleOpenEvent}>
            View
          </Button>
        </CardActions>
      </Box>
    </CardMui>
  );
};

export default EventCard;
