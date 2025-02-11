import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import React from "react";
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
  imageUrl?: string;
  eventId: string;
};

export const Card: React.FC<CardProps> = ({ title, imageUrl, eventId }: CardProps) => {
  const navigate = useNavigate();
  const handleOpenEvent = (eventId: string) => {
    navigate(`/${ROUTE_LIST.EVENTS}/${eventId}`);
  };

  return (
    <Box onClick={() => handleOpenEvent(eventId)} sx={cardContainerStyle}>
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
