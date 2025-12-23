import { Box, Stack, Typography } from "@mui/material";

import { fakeLinkStyles, footerContainerStyles } from "./styles.ts";

export const Footer = () => {
  return (
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
        <Typography variant="h6" color="primary.main">
          Links
        </Typography>
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
        <Typography variant="h6" color="primary.main">
          Contact
        </Typography>
        <Typography variant="body2" color="text.secondary">
          support@concerts.io
        </Typography>
        <Typography variant="body2" color="text.secondary">
          +1 (555) 000-ROCK
        </Typography>
      </Stack>
    </Box>
  );
};
