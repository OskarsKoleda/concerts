import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

import posterMissing from "../../../../assets/poster-missing.jpg";
import { useRootStore } from "../../../../store/StoreContext.tsx";

export const EventPoster = observer(function EventPoster() {
  const {
    eventDetailsUIStore: { currentEventPosterURL, currentEventPosterTitle },
  } = useRootStore();

  return (
    <Box>
      <img
        style={{
          height: "80vh",
          maxWidth: "700px",
          boxShadow: "4px 4px 10px #52C7B8",
        }}
        src={currentEventPosterURL ?? posterMissing}
        alt={currentEventPosterTitle || "Poster"}
      />
    </Box>
  );
});
