import { Paper, Typography, Box, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { posterImageStyle, concertInformationSectionStyle, cardStyle, titleStyle } from "./styles";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = observer(function Card({
  title,
  description,
  imageUrl,
  children,
}): JSX.Element {
  return (
    <Paper sx={cardStyle} elevation={3}>
      <Box>
        <Box sx={posterImageStyle} component="img" src={imageUrl} alt={`${title} poster`} />
        <Box sx={concertInformationSectionStyle}>
          <Tooltip title={`${title}`} placement="top">
            <Typography  gutterBottom variant="body1" sx={titleStyle}>
              {title}
            </Typography>
          </Tooltip>
          {description && (
            <Typography variant="caption">
              {description}
            </Typography>
          )}
        </Box>
        {children}
      </Box>
    </Paper>
  );
});
