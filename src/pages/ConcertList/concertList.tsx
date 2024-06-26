import { useStore } from "../../store/StoreContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
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
      <Box>
        <Container sx={headerStyle} maxWidth="md" component="section">
          <Typography sx={headerTitleStyle}>The List of Concerts</Typography>
        </Container>
        <Container maxWidth="md" component="section">
          <Grid container spacing={1.5}>
            {toJS(concertStore.concerts).map((concert) => (
              <Card key={concert.id} {...concert}>
                <Box sx={{ display: "flex", direction: "row", justifyContent: "space-between" }}>
                  <Button color="info">Edit</Button>
                  <Button color="warning" onClick={() => handleConcertDeletion(concert.id)}>Delete</Button>
                </Box>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default observer(ConcertListPage);
