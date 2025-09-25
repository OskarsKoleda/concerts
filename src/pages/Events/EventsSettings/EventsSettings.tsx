import TableRowsIcon from "@mui/icons-material/TableRows";
import { Box, IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../../store/StoreContext.tsx";

import { eventsSettingsContainerStyles } from "./styles.ts";

const EventsSettings = () => {
  const { isTableView: isTableViewSelected, toggleEventsView } = useRootStore().applicationStore;

  return (
    <Box sx={eventsSettingsContainerStyles}>
      <Tooltip title="Change to Table View">
        <IconButton
          color={isTableViewSelected ? "primary" : "default"}
          onClick={toggleEventsView}
          size="large"
        >
          <TableRowsIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default observer(EventsSettings);
