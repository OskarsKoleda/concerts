import { Grid, Paper, Typography, Box, ButtonBase } from "@mui/material";
import { observer } from "mobx-react-lite";
import { posterImageStyle, concertInformationSectionStyle, cardStyle } from "./styles";
import { useStore } from "../../store/StoreContext";

interface ConcertProps {
  id: string;
  band: string;
  year?: number;
  url: string;
}

export const Card = observer(function Card({ id, band, year, url }: ConcertProps): JSX.Element {
  const { concertStore } = useStore();

  function handleDeletion(concertId: string) {
    concertStore.deleteConcert(concertId);
  }

  return (
    <>
      <Grid item xs={3}>
        <ButtonBase disableRipple onClick={() => handleDeletion(id)}>
          <Paper sx={cardStyle} elevation={3}>
            <Box sx={posterImageStyle} component="img" src={url} alt={`${band} poster`} />
            <Box sx={concertInformationSectionStyle}>
              <Typography variant="h6">
                {band} - {year}
              </Typography>
              <Typography variant="body1">Some description is here</Typography>
            </Box>
          </Paper>
        </ButtonBase>
      </Grid>
    </>
  );
});
