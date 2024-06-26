import { useStore } from "../../store/StoreContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Box, Container, Typography, Grid } from "@mui/material";
import { headerStyle, headerTitleStyle } from "./styles";
import { Card } from "../../components/Card/card";
import { concertsLoadingBox } from "./styles";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../common/constants/appConstant";

function ConcertListPage() {
  const { concertStore } = useStore();
  const { showSnackbar } = useCustomSnackbar();

  useEffect(() => {
    concertStore.fetchAllConcerts();
  }, [concertStore]);

  function handleConcertDeletion(concertId: string) {
    concertStore.deleteConcert(concertId);
    showSnackbar({ message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_DELETION, variant: "success" });
  }

  if (concertStore.loading) {
    return (
      <Box sx={concertsLoadingBox}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  if (concertStore.error) {
    return <div>Error: {concertStore.error}</div>;
  }

  return (
    <>
      <Container>
        <Container sx={headerStyle} component="section">
          <Typography sx={headerTitleStyle}>The List of Concerts</Typography>
        </Container>
        <Container component="section">
          <Grid container spacing={1.5}>
            {toJS(concertStore.concerts).map((concert) => (
              <Grid item md={3} key={concert.id}>
                <Card onDelete={() => handleConcertDeletion(concert.id)} {...concert} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default observer(ConcertListPage);
