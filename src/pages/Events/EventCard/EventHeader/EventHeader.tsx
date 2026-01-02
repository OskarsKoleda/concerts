import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { formatEventDate } from "../../../../common/utils/utils";
import { useVisitEvent } from "../../../../api/events/useVisitEvent";
import { headerStyles } from "../styles";

import type { ServerEventData } from "../../../../common/types/eventTypes";
import { visitButtonStyles } from "./styles";
import { useRootStore } from "../../../../store/StoreContext";
import { observer } from "mobx-react-lite";
import { useUnvisitEvent } from "../../../../api/events/useUnvisitEvent";
import { LoadingButton } from "@mui/lab";

interface EventHeaderProps {
  event: ServerEventData;
}

const EventHeader = ({ event }: EventHeaderProps) => {
  const { title, date, endDate, slug, isVisited } = event;
  const { userStore } = useRootStore();
  const { mutate: visitEvent, isPending: visitPending } = useVisitEvent();
  const { mutate: unvisitEvent, isPending: unvisitPending } = useUnvisitEvent();

  const toggleVisited = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVisited) {
      unvisitEvent(slug);
    } else {
      visitEvent(slug);
    }
  };

  return (
    <Box sx={headerStyles}>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{formatEventDate(date, endDate)}</Typography>
      </Box>
      {userStore.isAuthenticated && (
        <LoadingButton
          onClick={toggleVisited}
          variant={isVisited ? "contained" : "outlined"}
          size="small"
          startIcon={isVisited ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
          sx={visitButtonStyles}
          loading={visitPending || unvisitPending}
        >
          {isVisited ? "I wasn't there" : "I was there"}
        </LoadingButton>
      )}
    </Box>
  );
};

export default observer(EventHeader);
