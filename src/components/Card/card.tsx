import { Paper, Typography, Box, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { posterImageStyle, concertInformationSectionStyle, cardStyle, buttonContainerStyle } from "./styles";
import { ConcertFormattedData } from "../../common/types/concert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type CardProps = ConcertFormattedData & { onDelete?: () => void };

export const Card: React.FC<CardProps> = observer(function Card({
  band,
  year,
  url,
  onDelete,
}: CardProps): JSX.Element {
  return (
    <>
      <Paper sx={cardStyle} elevation={3}>
        <Box>
          <Box sx={posterImageStyle} component="img" src={url} alt={`${band} poster`} />
          <Box sx={concertInformationSectionStyle}>
            <Typography gutterBottom>
              {band} - {year}
            </Typography>
            <Typography variant="body2">Some description is here</Typography>
          </Box>
          <Box sx={buttonContainerStyle}>
            <IconButton size="large">
              <EditIcon />
            </IconButton>
            <IconButton size="large" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </>
  );
});
