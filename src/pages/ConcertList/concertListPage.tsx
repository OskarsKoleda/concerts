import { useRootStore } from "../../store/StoreContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Box, Container, Typography, Grid } from "@mui/material";
import { appContainerStyles, headerStyle, headerTitleStyle } from "./styles";
import { Card } from "../../components/Card/card";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../common/constants/appConstant";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";

function ConcertListPage() {
  const {
    concerts: { fetchAllConcerts, deleteConcert, concerts, isLoading },
  } = useRootStore();
  const { showSnackbar } = useCustomSnackbar();

  useEffect(() => {
    fetchAllConcerts();
  }, [fetchAllConcerts]);

  function handleConcertDeletion(concertId: string) {
    deleteConcert(concertId);
    showSnackbar({ message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_DELETION, variant: "success" });
  }


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
                <Card onDelete={() => handleConcertDeletion(concert.id)} {...concert} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentLoader>
    </Box>
  );
}

export default observer(ConcertListPage);
