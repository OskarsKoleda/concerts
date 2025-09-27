import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { horizontallyCenteredStyles } from "../../../common/styles";
import Card from "../../../components/Card/Card";
import { ROUTES } from "../../../router/routes";

import { chipStyles } from "./styles";
import { formatEventDate } from "./utils";

import type { ServerEventData } from "../../../common/types/eventTypes";

interface EventCardProps {
  event: ServerEventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const { title, date, endDate, bands, city, location, url, slug } = event;

  const navigate = useNavigate();

  const openEventDetails = useCallback(() => {
    navigate(`${ROUTES.EVENTS}/${slug}`);
  }, [navigate, slug]);

  const formattedEventLocation = useMemo(() => {
    return location ? `${city} / ${location}` : city;
  }, [city, location]);

  return (
    <Card
      imageUrl={url}
      imageTitle={title}
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
        <Box sx={horizontallyCenteredStyles}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="subtitle1">{formattedEventLocation}</Typography>
        </Box>
      }
    />
  );
};

export default EventCard;
