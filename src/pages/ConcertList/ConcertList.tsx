import { useStore } from "../../store/StoreContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Box, Container, Typography, Grid } from "@mui/material";
import { headerStyle, headerTitleStyle } from "./styles";
import { Card } from "../../components/Card/card";

function ConcertListPage() {
  const { concertStore } = useStore();

  useEffect(() => {
    concertStore.fetchAllConcerts();
  }, [concertStore]);

  if (concertStore.loading) {
    return <div>Loading...</div>;
  }

  if (concertStore.error) {
    return <div>Error: {concertStore.error}</div>;
  }

  return (
    <>
      <Box>
        <Container sx={headerStyle} maxWidth="md" component="section">
          <Typography sx={headerTitleStyle}>The List of Concerts</Typography>
        </Container>
        <Container maxWidth="md" component="section">
          <Grid container spacing={1}>
            {toJS(concertStore.concerts).map((concert) => (
              <Card key={concert.id} {...concert} />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default observer(ConcertListPage);
