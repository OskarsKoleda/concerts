import { Paper, Typography, Box, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { posterImageStyle, concertInformationSectionStyle, cardStyle, titleStyle } from "./styles";
import { ConcertFormattedData } from "../../common/types/concert";

type CardProps = React.PropsWithChildren<ConcertFormattedData>;

export const Card: React.FC<CardProps> = observer(function Card({
  band,
  year,
  url,
  children,
}): JSX.Element {
  return (
    <Paper sx={cardStyle} elevation={3}>
      <Box>
        <Box sx={posterImageStyle} component="img" src={url} alt={`${band} poster`} />
        <Box sx={concertInformationSectionStyle}>
          <Tooltip title={`${band} - ${year}`} placement="top">
            <Typography gutterBottom variant="subtitle1" sx={titleStyle}>
              {band} - {year}
            </Typography>
          </Tooltip>
          <Typography variant="body2">Some description is here</Typography>
        </Box>
        {children}
      </Box>
    </Paper>
  );
});
