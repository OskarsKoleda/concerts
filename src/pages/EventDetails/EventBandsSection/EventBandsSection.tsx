import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";

import { artistsContainerStyles } from "./styles.ts";

interface EventBandsSectionProps {
  bands: string[];
}

export const EventBandsSection = ({ bands }: EventBandsSectionProps) => {
  return (
    <Paper sx={artistsContainerStyles}>
      <List>
        {bands.map((band) => (
          <ListItem
            key={band}
            secondaryAction={
              <IconButton edge="end">
                <StarBorderRoundedIcon />
              </IconButton>
            }
          >
            <ListItemText primary={band} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EventBandsSection;
