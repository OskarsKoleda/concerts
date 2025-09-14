import TableRowsIcon from "@mui/icons-material/TableRows";
import { Box, IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../../store/StoreContext.tsx";

const EventListSettings = () => {
  const { tableViewIsSelected, toggleEventsView } = useRootStore().applicationStore;

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
};

export default observer(EventListSettings);
