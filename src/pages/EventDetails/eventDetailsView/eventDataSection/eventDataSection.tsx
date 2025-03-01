import { Box, Divider, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store/StoreContext.tsx";
import { eventDataContainerStyles, eventDataFooterStyles, eventDataStyles } from "./styles.ts";

export const EventDataSection = observer(function EventDataSection() {
  const {
    eventDetailsUIStore: {
      currentEventCity,
      currentEventLocation,
      currentEventDate,
      currentFestivalStartDate,
      currentFestivalEndDate,
      currentFestivalTicketPrice,
    },
  } = useRootStore();

  const formattedDate =
    currentEventDate || `${currentFestivalStartDate} - ${currentFestivalEndDate}`;

  return (
    <Paper sx={eventDataContainerStyles}>
      <Box sx={eventDataStyles}>
        <Typography variant="h4">{currentEventCity}</Typography>
        <Typography variant="h5">{currentEventLocation}</Typography>
        <Typography variant="subtitle1" mt="1.5rem">
          {formattedDate}
        </Typography>
      </Box>

      <Divider orientation="horizontal" flexItem />
      <Box sx={eventDataFooterStyles}>
        <Typography variant="h4">{currentFestivalTicketPrice}</Typography>
      </Box>
    </Paper>
  );
});
