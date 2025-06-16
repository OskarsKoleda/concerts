import { CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { cardImageStyles, noPosterStyles } from "./styles.ts";

type EventImageProps = {
  eventTitle: string;
  posterImageUrl?: string;
};

const EventImage = ({ eventTitle, posterImageUrl }: EventImageProps) => {
  return (
    <>
      {posterImageUrl ? (
        <CardMedia sx={cardImageStyles} component="img" image={posterImageUrl} alt={eventTitle} />
      ) : (
        <Box sx={noPosterStyles}>
          <Typography variant="subtitle1" color="textSecondary">
            No Image
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EventImage;
