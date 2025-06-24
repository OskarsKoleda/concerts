import { horizontalCenteredStyles } from "../../common/styles";

export const cardStyles = {
  display: "flex",
  height: "13rem",
  transition: "transform 0.1s ease-out, filter 0.2s ease-out",

  "&:hover": {
    transform: "scale(1.03)",
    filter: "brightness(1.1)",
  },
};

export const cardRightSideStyles = {
  display: "grid",
  padding: "0.5rem",
  width: "100%",
};

export const chipStyles = {
  fontSize: "0.75rem",
  marginBottom: "0.1rem",
  marginRight: "0.1rem",
  fontWeight: "450",
  backgroundColor: "#B0A1BA",
};

export const cardActionsStyles = {
  ...horizontalCenteredStyles,

  justifyContent: "space-between",
  padding: 0,
};
