import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const EventHeader = () => {
  return (
    <Box sx={cardContentHeaderStyles}>
      <Typography variant="h5">{eventTitle}</Typography>
      <Typography variant="subtitle2" mb={0.5}>
        {formattedEventDate}
      </Typography>
    </Box>
  );
};
