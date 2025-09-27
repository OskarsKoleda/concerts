import TableRowsIcon from "@mui/icons-material/TableRows";
import { Box, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../../store/StoreContext.tsx";

import { eventsSettingsContainerStyles } from "./styles.ts";

const EventsSettings = () => {
  const { isTableView: isTableViewSelected, toggleEventsView } = useRootStore().applicationStore;

  return (
    <Box sx={eventsSettingsContainerStyles}>
      <IconButton
        color={isTableViewSelected ? "primary" : "default"}
        onClick={toggleEventsView}
        size="large"
      >
        <TableRowsIcon />
      </IconButton>
    </Box>
  );
};

export default observer(EventsSettings);
