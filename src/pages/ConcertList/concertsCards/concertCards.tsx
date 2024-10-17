import { Box, Grid } from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { Card } from "../../../components/CardWithImage/cardWithImage";
import { ConcertControlButtons } from "../../../components/ConcertControlButtons/ConcertControlButtons";
import { useRootStore } from "../../../store/StoreContext";

import { concertsContainerStyles } from "./styles";

export const ConcertCards: React.FC = observer(() => {
  const {
    concertListStore: { concerts },
  } = useRootStore();

  return (
    <Box sx={concertsContainerStyles}>
      <Grid container direction="row" justifyContent="space-evenly" rowSpacing={1}>
        {toJS(concerts).map((concert) => (
          <Grid item key={concert.id}>
            <Card imageUrl={concert.posterUrl} title={concert.title}>
              <ConcertControlButtons concertId={concert.id} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
