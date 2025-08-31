import { horizontallyCenteredStyles } from "../../common/styles";

import type { SxProps } from "@mui/system";

export const cardStyles: SxProps = {
  display: "flex",
  height: "15rem",
  transition: "transform 0.1s ease-out, filter 0.2s ease-out",

  "&:hover": {
    transform: "scale(1.03)",
    filter: "brightness(1.1)",
  },
};

export const cardRightSideStyles: SxProps = {
  display: "grid",
  padding: "0.5rem",
  width: "100%",
};

export const cardActionsStyles: SxProps = {
  justifyContent: "space-between",
  padding: 0,

  ...horizontallyCenteredStyles,
};

export const cardImageStyles: SxProps = {
  flexShrink: 0,
  width: "30%",
  objectFit: "cover",
};
