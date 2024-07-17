import { Box, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { buttonContainerStyle } from "./styles";
import React from "react";
import { useRootStore } from "../../store/StoreContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_LIST } from "../../router/routes";

export const ConcertControlButtons: React.FC<{ concertId: string }> = ({ concertId }) => {
  const {
    concertsStore: { getConcert },
  } = useRootStore();
  const navigate = useNavigate();


  function handleOpenConcert(concertId: string) {
    getConcert(concertId);
    navigate(`/${ROUTE_LIST.CONCERTS}/${concertId}`)
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