import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_LIST } from "../../router/routes";

import { buttonContainerStyle } from "./styles";

export const EventControlButtons: React.FC<{ concertId: string }> = ({ concertId }) => {
  const navigate = useNavigate();
  const handleOpenEvent = (concertId: string) => {
    navigate(`/${ROUTE_LIST.EVENTS}/${concertId}`);
  };

  return (
    <Box sx={buttonContainerStyle}>
      {/* <IconButton size="small" onClick={() => handleOpenEvent(concertId)}>
        <ArrowForwardIosIcon />
      </IconButton> */}
      <Button variant="outlined" onClick={() => handleOpenEvent(concertId)}>
        View
      </Button>
      {/* <DeleteEventButton concertId={concertId} /> */}
    </Box>
  );
};
