import { Box, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { useNavigate } from "react-router-dom";

import { DeleteConcertButton } from "../DeleteButton/DeleteButton";
import { ROUTE_LIST } from "../../router/routes";

import { buttonContainerStyle } from "./styles";

export const ConcertControlButtons: React.FC<{ concertId: string }> = ({ concertId }) => {
  const navigate = useNavigate();

  const handleOpenConcert = (concertId: string): void => {
    navigate(`/${ROUTE_LIST.CONCERTS}/${concertId}`);
  };

  return (
    <Box sx={buttonContainerStyle}>
      <IconButton size="small" onClick={() => handleOpenConcert(concertId)}>
        <ArrowForwardIosIcon />
      </IconButton>
      <DeleteConcertButton concertId={concertId} />
    </Box>
  );
};
