import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Grid, Paper } from "@mui/material";

import { useRootStore } from "../../../store/StoreContext";
import { Card } from "../../../components/CardWithImage/cardWithImage";
import { ConcertControlButtons } from "../../../components/ConcertControlButtons/ConcertControlButtons";

import { concertsContainerStyles } from "./styles";

export const ConcertsList: React.FC = observer(() => {
  const {
    concertsStore: { concerts },
  } = useRootStore();

  return (
    <Paper elevation={5} sx={concertsContainerStyles}>
      <Grid container spacing={2}>
        {toJS(concerts).map((concert) => (
          <Grid xl={1} md={2} sm={4} item key={concert.id}>
            <Card imageUrl={concert.posterUrl} title={concert.title}>
              <ConcertControlButtons concertId={concert.id} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
});
