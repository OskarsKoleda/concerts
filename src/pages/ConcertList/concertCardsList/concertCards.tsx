import { Box, Grid } from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { Card } from "../../../components/CardWithImage/cardWithImage";
import { useRootStore } from "../../../store/StoreContext";

import { concertsContainerStyles } from "./styles";

export const ConcertCardsList: React.FC = observer(function ConcertCardsList() {
  const {
    concertListStore: { concerts },
  } = useRootStore();

  return (
    <Box sx={concertsContainerStyles}>
      <Grid container direction="row" justifyContent="space-evenly" rowSpacing={1}>
        {toJS(concerts).map((concert) => (
          <Grid item key={concert.eventId}>
            <Card
              imageUrl={concert.posterUrl || concert.posterUrl}
              title={concert.eventTitle}
              concertId={concert.eventId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
