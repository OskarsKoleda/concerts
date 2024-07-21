import { Paper, Typography, Box, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { imageStyle, informationSectionStyle, cardStyle, titleStyle } from "./styles";

interface CardProps {
  title: string;
  imageUrl: string;
  description?: string;
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
        <Box sx={imageStyle} component="img" src={imageUrl} alt={`${title} poster`} />
        <Box sx={informationSectionStyle}>
          <Tooltip title={`${title}`} placement="top">
            <Typography gutterBottom variant="body1" sx={titleStyle}>
              {title}
            </Typography>
          </Tooltip>
          {description && <Typography variant="caption">{description}</Typography>}
        </Box>
        {children}
      </Box>
    </Paper>
  );
});
