import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { buttonContainerStyle } from "./styles";
import React from "react";

export const CardButtons: React.FC<{ concertId: string }> = ({ concertId }) => {
  return (
    <Box sx={buttonContainerStyle}>
      <IconButton size="small">
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton size="small">
        <EditIcon />
      </IconButton>
      <DeleteButton concertId={concertId} />
    </Box>
  );
};
