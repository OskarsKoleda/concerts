import { Box, Grid } from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import React from "react";
import { Card } from "../../../components/CardWithImage/cardWithImage";
import { useRootStore } from "../../../store/StoreContext";

import { eventsContainerStyles } from "./styles";

export const EventCardsList: React.FC = observer(function EventCardsList() {
  const {
    eventListStore: { events },
  } = useRootStore();

  return (
    <Box sx={eventsContainerStyles}>
      <Grid container direction="row" justifyContent="space-evenly" rowSpacing={1}>
        {toJS(events).map(({ eventId, eventTitle, posterImageUrl }) => (
          <Grid item key={eventId}>
            <Card imageUrl={posterImageUrl} title={eventTitle} eventId={eventId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
