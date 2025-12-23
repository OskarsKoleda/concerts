import { Box, Divider, Paper, Typography } from "@mui/material";

import NavLinkButton from "../../components/NavLinkButton/NavLinkButton.tsx";
import { ROUTES } from "../../router/routes";

import { homepageTexts } from "./constants";
import {
  buttonsContainerStyles,
  dividerStyles,
  homePageCardStyles,
  homePageContainerStyles,
  sectionTitleStyles,
  welcomeTextContainerStyles,
} from "./styles.ts";
import { Footer } from "./Footer/Footer.tsx";

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

      <Footer />
    </Box>
  );
};

export default Homepage;
