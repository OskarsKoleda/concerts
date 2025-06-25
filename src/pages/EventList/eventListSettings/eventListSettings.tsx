import TableRowsIcon from "@mui/icons-material/TableRows";
import { Box, IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { useRootStore } from "../../../store/StoreContext.tsx";

export const EventListSettings: React.FC = observer(function EventListSettings() {
  const {
    applicationStore: { tableViewIsSelected, toggleEventsView },
  } = useRootStore();

  return (
    <Box width="100%" display="flex" justifyContent="right" mb="0.5rem">
      <Tooltip title="Change to Table View">
        <IconButton
          color={tableViewIsSelected ? "primary" : "default"}
          onClick={toggleEventsView}
          size="large"
        >
          <TableRowsIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
});
