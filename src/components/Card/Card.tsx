import {
  Button,
  CardActions,
  CardContent as CardContentMui,
  CardMedia as CardMediaMui,
  Card as CardMui,
} from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react";

import { emptyPaddingStyles } from "../../common/styles.ts";

import { cardActionsStyles, cardImageStyles, cardRightSideStyles, cardStyles } from "./styles.ts";

import type { ReactNode } from "react";

interface CardProps {
  cardActionButtonTitle: string;
  onCardActionClick: () => void;
  imageUrl: string;
  imageTitle: string;
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

const Card = ({
  cardActionButtonTitle,
  onCardActionClick: cardAction,
  header,
  body,
  footer,
  imageUrl,
  imageTitle,
}: CardProps) => {
  return (
    <CardMui sx={cardStyles}>
      <CardMediaMui sx={cardImageStyles} component="img" image={imageUrl} alt={imageTitle} />
      <Box sx={cardRightSideStyles}>
        {header}
        <CardContentMui sx={emptyPaddingStyles}>{body}</CardContentMui>
        <CardActions sx={cardActionsStyles}>
          {footer}
          <Button variant="contained" onClick={cardAction}>
            {cardActionButtonTitle}
          </Button>
        </CardActions>
      </Box>
    </CardMui>
  );
};

export default memo(Card);
