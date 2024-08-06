import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Grid } from "@mui/material";

import { useRootStore } from "../../../store/StoreContext";
import { Card } from "../../../components/CardWithImage/cardWithImage";
import { ConcertControlButtons } from "../../../components/ConcertControlButtons/ConcertControlButtons";

function ConcertsGrid() {
  const {
    concertsStore: { concerts },
  } = useRootStore();

  return (
    <Grid container spacing={2}>
      {toJS(concerts).map((concert) => (
        <Grid md={2} xs={3}  item key={concert.id}>
          <Card imageUrl={concert.posterUrl} title={concert.title}>
            <ConcertControlButtons concertId={concert.id} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default observer(ConcertsGrid);
