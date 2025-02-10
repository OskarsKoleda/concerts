import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import React from "react";
import { NavLinkButton } from "../../components/NavButton/navButton";
import { ROUTE_LIST } from "../../router/routes";

import { homepageText } from "./constants";

const {
  ENGLISH: {
    titleSection,
    navigationSection: { addButton, viewButton },
    contentSection,
  },
} = homepageText;

export const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          {titleSection.mainTitle}
        </Typography>
        <Typography variant="h6" component="p" color="textSecondary">
          {titleSection.subTitle}
        </Typography>
      </Box>

      <Box textAlign="center" mb={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <NavLinkButton variant="contained" color="primary" to={`/${ROUTE_LIST.EVENTS}`}>
              {viewButton.label}
            </NavLinkButton>
          </Grid>
          <Grid item>
            <NavLinkButton variant="contained" color="secondary" to={`/${ROUTE_LIST.NEW_EVENT}`}>
              {addButton.label}
            </NavLinkButton>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          {contentSection.contentTitle}
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1" component="p">
            {contentSection.content}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
