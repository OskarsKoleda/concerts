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

interface EventHeaderProps {
  event: ServerEventData;
}

const EventHeader = ({ event }: EventHeaderProps) => {
  const { title, date, endDate, slug, isVisited } = event;
  const { mutate: visitEvent } = useVisitEvent();
  const { userStore } = useRootStore();

  const toggleVisited = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Use unvisit mutation if isVisited is true and it's implemented on the backend
    visitEvent(slug);
  };

  return (
    <Box sx={headerStyles}>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{formatEventDate(date, endDate)}</Typography>
      </Box>
      {userStore.isAuthenticated && (
        <Button
          onClick={toggleVisited}
          variant={isVisited ? "contained" : "outlined"}
          size="small"
          startIcon={isVisited ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
          sx={visitButtonStyles}
        >
          {isVisited ? "I wasn't there" : "I was there"}
        </Button>
      )}
    </Box>
  );
};

export default observer(EventHeader);
