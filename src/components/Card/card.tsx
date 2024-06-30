import { Paper, Typography, Box, IconButton, ButtonBase, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import {
  posterImageStyle,
  concertInformationSectionStyle,
  cardStyle,
  buttonContainerStyle,
  buttonBaseStyle,
  titleStyle,
} from "./styles";
import { ConcertFormattedData } from "../../common/types/concert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { ROUTE_LIST } from "../../router/routes";

type CardProps = ConcertFormattedData & { onDelete?: () => void };

export const Card: React.FC<CardProps> = observer(function Card({
  band,
  year,
  url,
  id,
  onDelete,
}: CardProps): JSX.Element {
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
        <Box sx={buttonContainerStyle}>
          <ButtonBase component={Link} to={`/${ROUTE_LIST.CONCERTS}/${id}`} sx={buttonBaseStyle}>
            <IconButton size="medium">
              <ArrowForwardIosIcon />
            </IconButton>
          </ButtonBase>
          <IconButton size="medium" sx={buttonBaseStyle}>
            <EditIcon />
          </IconButton>
          <IconButton size="medium" onClick={onDelete} sx={buttonBaseStyle}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
});
