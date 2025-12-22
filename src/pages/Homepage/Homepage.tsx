import { Box, Divider, Paper, Typography } from "@mui/material";

import NavLinkButton from "../../components/NavLinkButton/NavLinkButton.tsx";
import { ROUTES } from "../../router/routes";

import { homepageTexts } from "./constants";
import {
  buttonsContainerStyles,
  dividerStyles,
  homePageCardStyles,
  homePageContainerStyles,
  informationContainerStyles,
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
        <Box>
          <Typography variant="h4" color="text.primary">
            {titleSection.mainTitle}
          </Typography>
          <Divider sx={dividerStyles} />
          <Typography variant="h5" color="text.primary">
            {titleSection.subTitle}
          </Typography>
        </Box>
      </Box>

      <Box sx={informationContainerStyles}>
        <Paper sx={homePageCardStyles}>
          <Typography textAlign="justify" variant="body1">
            {contentSection.mainContent}
          </Typography>
          <Divider sx={dividerStyles} />
        </Paper>
        <Paper sx={homePageCardStyles}>
          <Typography textAlign="justify" variant="body2">
            {contentSection.additionalContent}
          </Typography>
        </Paper>
      </Box>

      <Box sx={buttonsContainerStyles}>
        <NavLinkButton color="secondary" to={ROUTES.EVENTS}>
          {viewButton.label}
        </NavLinkButton>
        <NavLinkButton color="secondary" to={ROUTES.NEW_EVENT}>
          {addButton.label}
        </NavLinkButton>
      </Box>
    </Box>
  );
};

export default Homepage;
