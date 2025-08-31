import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useGetEvents } from "../../../api/useGetEvents.ts";
import { horizontallyCenteredStyles } from "../../../common/styles.ts";
import Card from "../../../components/Card/Card.tsx";
import ContentLoader from "../../../components/ContentLoader/ContentLoader.tsx";
import { ROUTES } from "../../../router/routes.ts";

import { chipStyles } from "./styles.ts";
import { formatEventDate } from "./utils.ts";

import type { ServerEventData } from "../../../common/types/eventTypes.ts";

const EventsList = () => {
  const { events, isLoading } = useGetEvents();
  const navigate = useNavigate();

  const getFormattedEventLocation = useCallback((city: string, location: string | undefined) => {
    return location ? `${city} / ${location}` : city;
  }, []);

  const renderCard = useCallback(
    (event: ServerEventData) => {
      const { date, endDate, bands, city, location, slug, title, url } = event;
      const handleCardAction = () => {
        navigate(`${ROUTES.EVENTS}/${slug}`);
      };

      return (
        <Grid item key={slug} sm={12} md={6}>
          <Card
            imageUrl={url}
            imageTitle={title}
            cardActionButtonTitle="View"
            onCardActionClick={handleCardAction}
            header={
              <Box>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle1">{formatEventDate(date, endDate)}</Typography>
              </Box>
            }
            body={bands.map((band) => (
              <Chip key={band} label={band} size="small" sx={chipStyles} />
            ))}
            footer={
              <Box sx={horizontallyCenteredStyles}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="subtitle1">
                  {getFormattedEventLocation(city, location)}
                </Typography>
              </Box>
            }
          />
        </Grid>
      );
    },
    [getFormattedEventLocation, navigate],
  );

  return (
    <ContentLoader isLoading={isLoading}>
      {events.length ? (
        <Grid container rowSpacing={2} columnSpacing={2}>
          {events.map(renderCard)}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="h2">Nothing Found</Typography>
        </Box>
      )}
    </ContentLoader>
  );
};

export default EventsList;
