import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ROUTE_LIST } from "../../router/routes";

import {
  cardBackStyle,
  cardContainerStyle,
  cardContentStyle,
  cardFrontStyle,
  cardTitleStyle,
  imageStyle,
} from "./styles";

type CardProps = {
  title: string;
  imageUrl: string;
  concertId: string;
};

export const Card: React.FC<CardProps> = ({ title, imageUrl, concertId }: CardProps) => {
  const navigate = useNavigate();
  const handleOpenConcert = (concertId: string) => {
    navigate(`/${ROUTE_LIST.EVENTS}/${concertId}`);
  };

  return (
    <Box onClick={() => handleOpenConcert(concertId)} sx={cardContainerStyle}>
      <Box sx={cardContentStyle}>
        <Box sx={cardFrontStyle}>
          <Box sx={imageStyle} component="img" src={imageUrl} alt={`${title} poster`} />
        </Box>
        <Box sx={cardBackStyle}>
          <Typography variant="h6" sx={cardTitleStyle}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
