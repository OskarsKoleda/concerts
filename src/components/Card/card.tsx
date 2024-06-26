import { Grid, Paper, Typography, Box, ButtonBase } from "@mui/material";
import { observer } from "mobx-react-lite";
import { posterImageStyle, concertInformationSectionStyle, cardStyle } from "./styles";
import { ConcertFormattedData } from "../../common/types/concert";
import { ReactNode } from "react";

type CardProps = ConcertFormattedData & { children?: ReactNode };

export const Card: React.FC<CardProps> = observer(function Card({
  band,
  year,
  url,
  children,
}: CardProps): JSX.Element {

  return (
    <>
      <Grid item xs={3}>
        <ButtonBase disableRipple>
          <Paper sx={cardStyle} elevation={3}>
            <Box sx={posterImageStyle} component="img" src={url} alt={`${band} poster`} />
            <Box sx={concertInformationSectionStyle}>
              <Typography variant="h6">
                {band} - {year}
              </Typography>
              <Typography variant="body1">Some description is here</Typography>
            </Box>
            {children}
          </Paper>
        </ButtonBase>
      </Grid>
    </>
  );
});
