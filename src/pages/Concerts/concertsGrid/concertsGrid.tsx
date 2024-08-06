import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Grid, Paper } from "@mui/material";

import { useRootStore } from "../../../store/StoreContext";
import { Card } from "../../../components/CardWithImage/cardWithImage";
import { ConcertControlButtons } from "../../../components/ConcertControlButtons/ConcertControlButtons";
import { ContentLoader } from "../../../components/ContentLoader/contentLoader";

import { concertsContainerStyles } from "./styles";

function ConcertsGrid() {
  const {
    concertsStore: { concerts, isLoading },
  } = useRootStore();

  return (
    <ContentLoader isLoading={isLoading}>
      <Paper elevation={5} sx={concertsContainerStyles}>
        <Grid container spacing={2}>
          {toJS(concerts).map((concert) => (
            <Grid lg={1} md={2} sm={4} xs={6} item key={concert.id}>
              <Card imageUrl={concert.posterUrl} title={concert.title}>
                <ConcertControlButtons concertId={concert.id} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </ContentLoader>
  );
}

export default observer(ConcertsGrid);
