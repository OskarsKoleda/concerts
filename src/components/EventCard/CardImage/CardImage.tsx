import { CardMedia as CardMediaMui, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { cardImageStyles, noPosterStyles } from "./styles.ts";

interface CardImageProps {
  imageTitle: string;
  imageUrl?: string;
}

const CardImage = ({ imageTitle, imageUrl }: CardImageProps) => {
  return (
    <>
      {imageUrl ? (
        <CardMediaMui sx={cardImageStyles} component="img" image={imageUrl} alt={imageTitle} />
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

export default CardImage;
