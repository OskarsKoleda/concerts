import { useRootStore } from "../../../store/StoreContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Box, Container, Typography, Grid } from "@mui/material";
import { appContainerStyles, headerStyle, headerTitleStyle } from "./styles";
import { Card } from "../../../components/Card/card";
import { ContentLoader } from "../../../components/ContentLoader/contentLoader";
import { CardButtons } from "../../../components/CardButtons/CardButtons";

function ConcertList() {
  const {
    concerts: { fetchAllConcerts, concerts, isLoading },
  } = useRootStore();

  useEffect(() => {
    fetchAllConcerts();
  }, [fetchAllConcerts]);

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
                <Card {...concert}>
                  <CardButtons concertId={concert.id} />
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
