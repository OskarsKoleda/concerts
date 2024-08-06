import { Box, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useRootStore } from "../../store/StoreContext";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { ROUTE_LIST } from "../../router/routes";

import { buttonContainerStyle } from "./styles";

export const ConcertControlButtons: React.FC<{ concertId: string }> = ({ concertId }) => {
  const {
    concertsStore: { getConcert },
  } = useRootStore();
  const navigate = useNavigate();

  function handleOpenConcert(concertId: string) {
    getConcert(concertId);
    navigate(`/${ROUTE_LIST.CONCERTS}/${concertId}`);
  }

  return (
    <Box sx={buttonContainerStyle}>
      <IconButton size="small" onClick={() => handleOpenConcert(concertId)}>
        <ArrowForwardIosIcon />
      </IconButton>
      <DeleteButton concertId={concertId} />
    </Box>
  );
};
