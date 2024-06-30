import React from "react";
import ConcertListPage from "../Concerts/ConcertList/concertList";
import { Box, Grid } from "@mui/material";
import { NewConcertSubmit } from "./formContent/newConcertSubmit/newConcertSubmit";

export const NewConcertPage: React.FC = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={7} lg={8} xl={9} >
          <ConcertListPage />
        </Grid>
        <Grid item xs={12} md={5} lg={4} xl={3} >
          <NewConcertSubmit />
        </Grid>
      </Grid>
    </Box>
  );
};
