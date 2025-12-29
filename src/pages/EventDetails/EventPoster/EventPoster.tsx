import { useState } from "react";
import { Box } from "@mui/material";

import { eventPosterStyles } from "./styles.ts";

interface EventPosterProps {
  posterURL: string;
  posterTitle: string;
}

export const EventPoster = ({ posterURL, posterTitle }: EventPosterProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box sx={eventPosterStyles}>
      <img
        style={{
          opacity: isLoaded ? 1 : 0,
          maxHeight: "75vh",
          maxWidth: "100%",
          transition: "opacity 0.6s ease-in-out",
        }}
        src={posterURL}
        alt={posterTitle}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </Box>
  );
};

export default EventPoster;
