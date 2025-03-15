import { observer } from "mobx-react-lite";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import DnsIcon from "@mui/icons-material/Dns";
import ListIcon from "@mui/icons-material/List";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useRootStore } from "../../../store/StoreContext.tsx";

export const EventListSettings: React.FC = observer(function EventListSettings() {
  const {
    applicationStore: {
      smallCardsViewIsSelected,
      tableViewIsSelected,
      toggleSmallCardsView,
      toggleEventsView,
    },
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

      <Tooltip title={smallCardsViewIsSelected ? "Switch to Cards View" : "Switch to Rows View"}>
        <Box display="flex">
          <IconButton onClick={toggleSmallCardsView} disabled={tableViewIsSelected}>
            {smallCardsViewIsSelected ? <DnsIcon /> : <ListIcon />}
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
});
