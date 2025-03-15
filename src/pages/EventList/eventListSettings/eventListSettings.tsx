import { observer } from "mobx-react-lite";
import { Box, IconButton } from "@mui/material";
import React from "react";
import DnsIcon from "@mui/icons-material/Dns";
import ListIcon from "@mui/icons-material/List";
import { useRootStore } from "../../../store/StoreContext.tsx";

export const EventListSettings: React.FC = observer(function EventListSettings() {
  const {
    applicationStore: { smallCardsViewIsSelected, toggleSmallCardsView },
  } = useRootStore();

  return (
    <Box width="100%" display="flex" justifyContent="right" mb="0.5rem">
      <IconButton onClick={toggleSmallCardsView}>
        {smallCardsViewIsSelected ? <DnsIcon /> : <ListIcon />}
      </IconButton>
    </Box>
  );
});
