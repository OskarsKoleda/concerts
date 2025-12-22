import { Box } from "@mui/material";

import posterMissing from "../../../assets/poster-missing.jpg";
import { eventPosterStyles } from "./styles.ts";

interface EventPosterProps {
  posterURL?: string;
  posterTitle?: string;
}

export const EventPoster = ({ posterURL, posterTitle }: EventPosterProps) => {
  return (
    <Box sx={eventPosterStyles}>
      <img
        style={{
          display: "block",
          maxHeight: "75vh",
          maxWidth: "100%",
        }}
        src={posterURL ?? posterMissing}
        alt={posterTitle ?? "Poster"}
      />
    </Box>
  );
};

export default EventPoster;
