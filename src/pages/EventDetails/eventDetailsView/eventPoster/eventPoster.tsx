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
          height: "80vh",
          boxShadow: "4px 4px 10px #52C7B8",
        }}
        src={currentEventPosterURL}
        alt={currentEventPosterTitle}
      />
    </Box>
  );
});
