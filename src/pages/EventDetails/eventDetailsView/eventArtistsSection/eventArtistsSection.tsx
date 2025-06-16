import { observer } from "mobx-react-lite";
import { IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

import { useRootStore } from "../../../../store/StoreContext.tsx";

import { artistsContainerStyles } from "./styles.ts";

export const EventArtistsSection = observer(function EventArtistsSection() {
  const {
    eventDetailsUIStore: { currentEventArtists },
  } = useRootStore();

  return (
    <Paper sx={artistsContainerStyles}>
      <List>
        {currentEventArtists.map((artist) => (
          <ListItem
            key={artist}
            secondaryAction={
              <IconButton edge="end">
                <StarBorderRoundedIcon />
              </IconButton>
            }
          >
            <ListItemText primary={artist} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
});
