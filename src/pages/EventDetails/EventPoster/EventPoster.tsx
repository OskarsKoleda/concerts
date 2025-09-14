import { Box } from "@mui/material";

import posterMissing from "../../../assets/poster-missing.jpg";

interface EventPosterProps {
  posterURL?: string;
  posterTitle?: string;
}

export const EventPoster = ({ posterURL, posterTitle }: EventPosterProps) => {
  return (
    <Box>
      <img
        style={{
          height: "80vh",
          maxWidth: "700px",
          boxShadow: "4px 4px 10px #52C7B8",
        }}
        src={posterURL ?? posterMissing}
        alt={posterTitle ?? "Poster"}
      />
    </Box>
  );
};

export default EventPoster;
