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
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { emptyPaddingStyles, horizontallyCenteredStyles } from "../../common/styles.ts";
import { ROUTES } from "../../router/routes.ts";

import CardImage from "./CardImage/CardImage.tsx";
import { cardActionsStyles, cardRightSideStyles, cardStyles, chipStyles } from "./styles.ts";
import { formatEventDate } from "./utils.ts";

import type { ServerEventData } from "../../common/types/eventTypes.ts";

interface EventCardProps {
  event: ServerEventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const { url, slug, title, bands = [], city, location, date, endDate } = event;

  const navigate = useNavigate();
  const eventPath = `${ROUTES.EVENTS}/${slug}`;
  const handleOpenEvent = () => navigate(eventPath);

  const formattedEventLocation = location ? `${city} / ${location}` : city;
  const formattedEventDate = formatEventDate(date, endDate);

  return (
    <CardMui sx={cardStyles}>
      <CardImage imageTitle={title} imageUrl={url} />
      <Box sx={cardRightSideStyles}>
        <CardHeaderMui sx={emptyPaddingStyles} title={title} subheader={formattedEventDate} />

        {bands.length > 0 && (
          <CardContentMui sx={emptyPaddingStyles}>
            {bands.map((band) => (
              <Chip key={band} label={band} size="small" sx={chipStyles} />
            ))}
          </CardContentMui>
        )}

        <CardActions sx={cardActionsStyles}>
          <Box sx={horizontallyCenteredStyles}>
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

export default memo(EventCard);
