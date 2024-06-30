import React from "react";
import ConcertList from "../Concerts/ConcertList/concertList";
import { Box, Grid } from "@mui/material";
import { ConcertDetails } from "./ConcertDetails/concertDetails";

export const ConcertDetailsPage: React.FC = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={7} lg={8} xl={9}>
          <ConcertList />
        </Grid>
        <Grid item xs={12} md={5} lg={4} xl={3}>
          <ConcertDetails />
        </Grid>
      </Grid>
    </Box>
  );
};
