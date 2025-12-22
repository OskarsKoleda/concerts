import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

import NavLinkButton from "../../components/NavLinkButton/NavLinkButton.tsx";
import { ROUTES } from "../../router/routes";

import { homepageTexts } from "./constants";
import {
  buttonsContainerStyles,
  dividerStyles,
  fakeLinkStyles,
  footerContainerStyles,
  homePageCardStyles,
  homePageContainerStyles,
  sectionTitleStyles,
  welcomeTextContainerStyles,
} from "./styles.ts";

const {
  ENGLISH: {
    titleSection,
    navigationSection: { addButton, viewButton },
    contentSection,
  },
} = homepageTexts;

const Homepage = () => {
  return (
    <Box sx={homePageContainerStyles}>
      <Box sx={welcomeTextContainerStyles}>
        <Typography variant="h1" sx={sectionTitleStyles}>
          {titleSection.mainTitle}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {titleSection.subTitle}
        </Typography>
      </Box>

      <Box>
        <Paper sx={homePageCardStyles}>
          <Typography textAlign="justify" variant="body1">
            {contentSection.mainContent}
          </Typography>
          <Divider sx={dividerStyles} />
          <Typography textAlign="justify" variant="body2" color="text.secondary">
            {contentSection.additionalContent}
          </Typography>
        </Paper>
      </Box>

      <Box sx={buttonsContainerStyles}>
        <NavLinkButton color="secondary" size="large" to={ROUTES.EVENTS}>
          {viewButton.label}
        </NavLinkButton>
        <NavLinkButton variant="outlined" color="primary" size="large" to={ROUTES.NEW_EVENT}>
          {addButton.label}
        </NavLinkButton>
      </Box>

      <Box sx={footerContainerStyles}>
        <Stack spacing={2}>
          <Typography variant="h6" color="primary.main">
            Concerts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The ultimate platform for discovering and managing live music events.
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h6">Links</Typography>
          <Typography variant="body2" sx={fakeLinkStyles}>
            Browse Events
          </Typography>
          <Typography variant="body2" sx={fakeLinkStyles}>
            Post Event
          </Typography>
          <Typography variant="body2" sx={fakeLinkStyles}>
            Ticketing
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h6">Contact</Typography>
          <Typography variant="body2" color="text.secondary">
            support@concerts.io
          </Typography>
          <Typography variant="body2" color="text.secondary">
            +1 (555) 000-ROCK
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Homepage;
