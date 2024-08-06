import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Box, Container, Typography, Grid } from "@mui/material";

import { useRootStore } from "../../../store/StoreContext";
import { Card } from "../../../components/CardWithImage/cardWithImage";
import { ContentLoader } from "../../../components/ContentLoader/contentLoader";
import { ConcertControlButtons } from "../../../components/ConcertControlButtons/ConcertControlButtons";

import { appContainerStyles, headerStyle, headerTitleStyle } from "./styles";

function ConcertList() {
  const {
    concertsStore: { concerts, isLoading },
  } = useRootStore();

  return (
    <Box sx={appContainerStyles}>
      <Container sx={headerStyle} component="section">
        <Typography sx={headerTitleStyle}>The List of Concerts</Typography>
      </Container>
      <ContentLoader isLoading={isLoading}>
        <Container component="section">
          <Grid container spacing={1.5}>
            {toJS(concerts).map((concert) => (
              <Grid item md={2} key={concert.id}>
                <Card imageUrl={concert.posterUrl} title={concert.title}>
                  <ConcertControlButtons concertId={concert.id} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentLoader>
    </Box>
  );
}

export default observer(ConcertList);
