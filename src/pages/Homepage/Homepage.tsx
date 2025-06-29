import { Box, Divider, Paper, Typography } from "@mui/material";

import NavLinkButton from "../../components/NavLinkButton/NavLinkButton.tsx";
import { ROUTE_LIST } from "../../router/routes";

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
        <Box textAlign="center">
          <Typography variant="h4">{titleSection.mainTitle}</Typography>
          <Divider sx={dividerStyles} />
          <Typography variant="h5">{titleSection.subTitle}</Typography>
        </Box>
      </Box>

      <Box sx={informationContainerStyles}>
        <Paper sx={homePageCardStyles}>
          <Typography textAlign="justify" variant="body1">
            {contentSection.mainContent}
          </Typography>
          <Divider sx={dividerStyles} />
          <Typography textAlign="justify" variant="body2">
            {contentSection.additionalContent}
          </Typography>
        </Paper>
        <Paper sx={homePageCardStyles}>Statistics:</Paper>
      </Box>

      <Box sx={buttonsContainerStyles}>
        <NavLinkButton color="secondary" to={ROUTE_LIST.EVENTS}>
          {viewButton.label}
        </NavLinkButton>
        <NavLinkButton color="secondary" to={ROUTE_LIST.NEW_EVENT}>
          {addButton.label}
        </NavLinkButton>
      </Box>
    </Box>
  );
};

export default Homepage;
