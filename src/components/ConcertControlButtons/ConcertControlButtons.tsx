import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_LIST } from "../../router/routes";

import { buttonContainerStyle } from "./styles";

export const ConcertControlButtons: React.FC<{ concertId: string }> = ({ concertId }) => {
  const navigate = useNavigate();
  const handleOpenConcert = (concertId: string) => {
    navigate(`/${ROUTE_LIST.EVENTS}/${concertId}`);
  };

  return (
    <Box sx={buttonContainerStyle}>
      {/* <IconButton size="small" onClick={() => handleOpenConcert(concertId)}>
        <ArrowForwardIosIcon />
      </IconButton> */}
      <Button variant="outlined" onClick={() => handleOpenConcert(concertId)}>
        View
      </Button>
      {/* <DeleteConcertButton concertId={concertId} /> */}
    </Box>
  );
};
