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
import { DeleteButton } from "../DeleteButton/DeleteButton";

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
            <ButtonBase component={Link} to={`/concert/${id}`}>
              <IconButton size="large">
                <ArrowForwardIosIcon />
              </IconButton>
            </ButtonBase>
            <IconButton size="large">
              <EditIcon />
            </IconButton>
            <IconButton size="large" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
  );
});
