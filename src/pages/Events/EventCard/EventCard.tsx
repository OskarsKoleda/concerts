import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import posterMissing from "../../../assets/poster-missing.jpg";
import { formatEventDate } from "../../../common/utils/utils";
import Card from "../../../components/Card/Card";
import { ROUTES } from "../../../router/routes";

import {
  chipStyles,
  eventAuthorStyles,
  footerStyles,
  locationIconStyles,
  locationStyles,
} from "./styles";

import type { ServerEventData } from "../../../common/types/eventTypes";

interface EventCardProps {
  event: ServerEventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const { title, date, endDate, bands, city, location, url, slug, owner } = event;

  const navigate = useNavigate();

  const openEventDetails = useCallback(() => {
    navigate(`${ROUTES.EVENTS}/${slug}`);
  }, [navigate, slug]);

  const formattedEventLocation = useMemo(() => {
    return location ? `${city} / ${location}` : city;
  }, [city, location]);

  return (
    <Card
      imageUrl={url || posterMissing}
      imageTitle={url ? title : "poster-is-missing"}
      cardActionButtonTitle="View"
      onCardActionClick={openEventDetails}
      header={
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1">{formatEventDate(date, endDate)}</Typography>
        </Box>
      }
      body={
        bands?.length > 0
          ? bands.map((band) => <Chip key={band} label={band} size="small" sx={chipStyles} />)
          : null
      }
      footer={
        <Box sx={footerStyles}>
          <Box sx={locationStyles}>
            <LocationOnIcon fontSize="small" sx={locationIconStyles} />
            <Typography variant="body2" color="text.secondary">
              {formattedEventLocation}
            </Typography>
          </Box>
          <Typography sx={eventAuthorStyles}>added by {owner.name}</Typography>
        </Box>
      }
    />
  );
};

export default EventCard;
