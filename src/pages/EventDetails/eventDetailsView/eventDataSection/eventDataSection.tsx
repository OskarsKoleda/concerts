import { Box, Divider, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRootStore } from "../../../../store/StoreContext.tsx";
import { ROUTE_LIST } from "../../../../router/routes.ts";
import { eventDataContainerStyles, eventDataFooterStyles, eventDataStyles } from "./styles.ts";

export const EventDataSection = observer(function EventDataSection() {
  const {
    eventDetailsUIStore: {
      currentEventId,
      currentEventCity,
      currentEventLocation,
      currentEventDate,
      currentFestivalStartDate,
      currentFestivalEndDate,
      currentFestivalTicketPrice,
    },
  } = useRootStore();

  const navigate = useNavigate();

  const formattedDate =
    currentEventDate || `${currentFestivalStartDate} - ${currentFestivalEndDate}`;

  const openEditView = (eventId: string) => {
    navigate(`${ROUTE_LIST.EVENTS}/${eventId}/edit`);
  };

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
      <Divider orientation="horizontal" flexItem />
      <Box>
        <Button variant="outlined">Back</Button>
        <Button variant="outlined" onClick={() => openEditView(currentEventId)}>
          Edit
        </Button>
      </Box>
    </Paper>
  );
});
