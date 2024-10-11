import { Box, Typography } from "@mui/material";

import {
  cardBackStyle,
  cardContainerStyle,
  cardContentStyle,
  cardFrontStyle,
  cardTitleStyle,
  imageStyle,
} from "./styles";

interface CardProps {
  title: string;
  imageUrl: string;
  description?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, imageUrl, children }) => {
  return (
      <Box sx={cardContainerStyle}>
        <Box sx={cardContentStyle}>
          <Box sx={cardFrontStyle}>
            <Box sx={imageStyle} component="img" src={imageUrl} alt={`${title} poster`} />
          </Box>
          <Box sx={cardBackStyle}>
            <Typography variant="h6" sx={cardTitleStyle}>
              {title}
            </Typography>
            {description && <Typography variant="body2">{description}</Typography>}
            {children}
          </Box>
        </Box>
      </Box>
  );
};
