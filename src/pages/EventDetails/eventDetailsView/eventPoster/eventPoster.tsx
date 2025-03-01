import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { useRootStore } from "../../../../store/StoreContext.tsx";

export const EventPoster = observer(function EventPoster() {
  const {
    eventDetailsUIStore: { currentEventPosterURL, currentEventPosterTitle },
  } = useRootStore();

  return (
    <Box>
      <img
        style={{
          height: "70vh",
        }}
        src={currentEventPosterURL}
        alt={currentEventPosterTitle}
      />
    </Box>
  );
});
